import { PlusIcon } from "@heroicons/react/outline";

export default function Story({ username, img, isUser = false }) {
  return (
    <div className="relative group">
      <img
        src={img}
        alt={username}
        className="h-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer group-hover:scale-110 transition-transform duration-200 ease-out"
      />
      {isUser && (
        <PlusIcon className="h-6 absolute top-4 left-4 text-white group-hover:scale-110 cursor-pointer" />
      )}
      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
}
