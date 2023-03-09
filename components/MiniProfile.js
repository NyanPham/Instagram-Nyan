import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import userState from "../atoms/userAtom";

export default function MiniProfile() {
  const [currentUser] = useRecoilState(userState);
  const auth = getAuth();

  function onSignOut() {
    signOut(auth);
  }

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      {currentUser?.userImg && (
        <Image
          src={currentUser?.userImg}
          alt={currentUser?.username}
          width={64}
          height={64}
          className="h-16 rounded-full border p-[2px] object-cover"
        />
      )}
      <div className="flex-1 ml-4">
        <h1 className="font-bold">{currentUser?.username}</h1>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button
        className="font-semibold text-blue-400 text-sm"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
