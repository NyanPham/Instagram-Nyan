import Image from "next/image";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";

export default function Post({ id, username, userImg, img, caption }) {
  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5">
        {userImg && (
          <Image
            src={userImg}
            alt={username}
            width={48}
            height={48}
            className="w-12 rounded-full object-cover border p-1 mr-3"
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
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/* Comments */}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* Post Input box */}

      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          className="border-none flex-1 focus:outline-none focus:ring-0"
          type="text"
          placeholder="Enter your comment..."
        />
        <button type="submit" className="text-blue-400 font-bold">
          Post
        </button>
      </form>
    </div>
  );
}
