import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";
import heroMobile from "../../public/herosection_img_mob.png";
import instagramLogo2 from "../../public/instagram-logo-2.png";

export default function Login({ providers }) {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center space-x-7 mt-20">
        <div className="hidden md:inline-flex md:w-48 h-96 rotate-6 relative">
          <Image
            src={heroMobile}
            alt="instagram image"
            className="object-cover"
            layout="fill"
          />
        </div>

        <div className="">
          {Object.values(providers).map((provider) => (
            <div className="flex flex-col items-center" key={provider.name}>
              <div className="w-32 h-32 relative">
                <Image
                  src={instagramLogo2}
                  alt="instagram logo"
                  className="object-cover"
                  layout="fill"
                />
              </div>
              <p className="text-sm italic my-10 text-center">
                This app is created for learning purposes only
              </p>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
