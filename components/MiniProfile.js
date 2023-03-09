import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      {session?.user.image && (
        <Image
          src={session?.user.image}
          alt={session?.user.name}
          width={64}
          height={64}
          className="h-16 rounded-full border p-[2px] object-cover"
        />
      )}
      <div className="flex-1 ml-4">
        <h1 className="font-bold">{session?.user.name}</h1>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button className="font-semibold text-blue-400 text-sm" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
