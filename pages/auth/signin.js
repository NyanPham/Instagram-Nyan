import Image from "next/image";
import Header from "../../components/Header";
import heroMobile from "../../public/herosection_img_mob.png";
import instagramLogo2 from "../../public/instagram-logo-2.png";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../../firebase";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
        });
      }

      router.push("/");
    } catch (err) {
      alert(err);
    }
  }

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
          <div className="flex flex-col items-center">
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
              onClick={onGoogleClick}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
