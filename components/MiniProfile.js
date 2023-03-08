import Image from "next/image";
import React from "react";
import nyan from "../public/nyan-image.png";

export default function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <Image
        src={nyan}
        alt="user-image"
        width={64}
        height={64}
        className="h-16 rounded-full border p-[2px] object-cover"
      />
      <div className="flex-1 ml-4">
        <h1 className="font-bold">CodeWithNyan</h1>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button className="font-semibold text-blue-400 text-sm">Sign out</button>
    </div>
  );
}
