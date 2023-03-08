import Image from "next/image";
import instagram from "../public/instagram.png";

export default function Header() {
  return (
    <div>
      {/* Left */}
      <div className="flex items-center justify-between max-w-6xl">
        <div className="h-24 w-24 relative hidden lg:inline-grid">
          <Image src={instagram} layout="fill" className="object-contain" />
        </div>
        <div className="h-24 w-10 relative lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"
            layout="fill"
            className="object-contain"
          />
        </div>
        <div className="">Right side</div>
      </div>
      {/* Middle */}
      {/* Right */}
    </div>
  );
}
