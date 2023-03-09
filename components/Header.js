import Image from "next/image";
import instagram from "../public/instagram.png";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import modalState from "../atoms/modalAtom";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        <div className="h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src={instagram}
            alt="instagram logo"
            layout="fill"
            className="object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="h-24 w-10 relative lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"
            alt="instagram logo"
            layout="fill"
            className="object-contain"
          />
        </div>
        <div className="relative">
          <div className="absolute top-2 left-2">
            <SearchIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
            placeholder="Search"
          />
        </div>
        <div className="flex space-x-4 items-center">
          <HomeIcon
            className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
            onClick={() => router.push("/")}
          />
          {session ? (
            <>
              <PlusCircleIcon
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
                onClick={() => setOpen(true)}
              />
              <div className="h-10 w-10 rounded-full object-cover inline-flex cursor-pointer relative">
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  layout="fill"
                  onClick={signOut}
                  className="rounded-full object-cover"
                />
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}
