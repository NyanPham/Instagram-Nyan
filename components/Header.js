import Image from "next/image";
import instagram from "../public/instagram.png";
import { SearchIcon } from "@heroicons/react/outline";

export default function Header() {
  return (
    <div className="flex items-center justify-between max-w-6xl">
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
      <div className="">Rightside</div>
    </div>
  );
}
