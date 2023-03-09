import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function Login({ providers }) {
  return (
    <>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        <img
          src="https://www.steve.ai/assets/instagramvideomaker/herosection_img_mob.png"
          alt="instagram image"
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
        />
        <div className="">
          {Object.values(providers).map((provider) => (
            <div className="flex flex-col items-center" key={provider.name}>
              <img
                src="https://atpsoftware.vn/wp-content/uploads//2019/04/instagram-logo-2.png"
                alt="instagram logo"
                className="w-32 object-cover"
              />
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
