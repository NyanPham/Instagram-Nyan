import { PlusIcon } from "@heroicons/react/outline";
import Image from "next/image";

export default function Story({ username, img, isUser = false }) {
  return (
    <div className="relative group">
      <div className="relative h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer group-hover:scale-110 transition-transform duration-200 ease-out">
        <Image
          src={img}
          alt={username}
          layout="fill"
          className="rounded-full"
        />
      </div>

      {isUser && (
        <PlusIcon className="h-6 absolute top-4 left-4 text-white group-hover:scale-110 cursor-pointer" />
      )}
      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
}
