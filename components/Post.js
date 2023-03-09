import Image from "next/image";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

export default function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    if (session == null) return;

    setHasLiked(likes.findIndex((like) => like.id === session.user.uid) !== -1);
  }, [likes, session]);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  }

  async function sendComment(e) {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    try {
      await addDoc(collection(db, "posts", id, "comments"), {
        comment: commentToSend,
        username: session.user.username,
        userImage: session.user.image,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5 space-x-3">
        {userImg && (
          <Image
            src={userImg}
            alt={username}
            width={48}
            height={48}
            className="rounded-full object-cover border p-1"
          />
        )}

        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5 " />
      </div>
      <div className="w-full h-96 relative">
        {img && (
          <Image
            src={img}
            alt={caption}
            layout="fill"
            className="object-contain w-full"
          />
        )}
      </div>

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-400"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Comments */}

      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-auto scrollbar-none">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-2" key={comment.id}>
              <div className="relative h-7 w-7">
                <Image
                  src={comment.data().userImage}
                  alt={comment.data().username}
                  layout="fill"
                  className="object-cover rounded-full"
                />
              </div>
              <p className="font-semibold">{comment.data().username}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}

      {/* Post Input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            className="border-none flex-1 focus:outline-none focus:ring-0"
            type="text"
            placeholder="Enter your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={comment == null || comment.trim() === ""}
            className="text-blue-400 font-bold disabled:text-blue-200"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
