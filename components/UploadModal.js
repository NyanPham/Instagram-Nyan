import { useRecoilState } from "recoil";
import modalState from "../atoms/modalAtom";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  function addImageToPost(e) {
    const reader = new FileReader();
    if (e.target.files[0] != null) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    }
  }

  return (
    <div>
      {open && (
        <Modal
          className="max-w-lg w-[90%] p-6 absolute top-56 left-1/2 -translate-x-1/2 bg-white border-2 rounded-md shadow-md"
          isOpen={open}
          onRequestClose={() => {
            setSelectedFile(null);
            setOpen(false);
          }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            {selectedFile ? (
              <img
                src={selectedFile}
                alt="selected image"
                className="w-full max-h-64 object-cover cursor-pointer"
                onClick={() => setSelectedFile(null)}
              />
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
            />
            <button
              disabled
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
