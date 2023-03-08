import Image from "next/image";
import instagram from "../public/instagram.png";
import nyan from "../public/nyan-image.png";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

export default function Header() {
  return (
    <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
      <div className="h-24 w-24 relative hidden lg:inline-grid">
        <Image
          src={instagram}
          alt="instagram logo"
          layout="fill"
          className="object-contain"
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
        <HomeIcon className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
        <PlusCircleIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
        <Image
          src={nyan}
          alt="user-image"
          className="h-10 w-10 rounded-full object-cover"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
}
