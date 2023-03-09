import { useRecoilState } from "recoil";
import modalState from "../atoms/modalAtom";
import userState from "../atoms/userAtom";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [currentUser] = useRecoilState(userState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const captionInputRef = useRef(null);

  function addImageToPost(e) {
    const reader = new FileReader();
    if (e.target.files[0] != null) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    }
  }

  async function uploadPost() {
    if (loading) return;

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        caption: captionInputRef.current.value,
        username: currentUser.username,
        profileImg: currentUser.userImg,
        timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      const snapshot = await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
      setSelectedFile(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  return (
    <div>
      {open && (
        <Modal
          className="max-w-lg w-[90%] p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded-md shadow-md"
          isOpen={open}
          onRequestClose={() => {
            setSelectedFile(null);
            setOpen(false);
          }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            {selectedFile ? (
              <div className="w-full h-64 cursor-pointer relative">
                <Image
                  src={selectedFile}
                  alt="selected image"
                  className="object-contain"
                  onClick={() => setSelectedFile(null)}
                  layout="fill"
                />
              </div>
            ) : (
              <CameraIcon
                onClick={() => fileInputRef.current.click()}
                className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"
              />
            )}

            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength="150"
              placeholder="Please enter your caption..."
              className="m-4 border-none text-center w-full focus:ring-0"
              ref={captionInputRef}
            />
            <button
              disabled={selectedFile == null || loading}
              onClick={uploadPost}
              className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
