import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useRecoilState } from "recoil";
import userState from "../atoms/userAtom";

export default function Feed() {
  const [currentUser] = useRecoilState(userState);

  return (
    <main
      className={`${
        currentUser
          ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto"
          : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto"
      } grid `}
    >
      <section className="md:col-span-2">
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>
      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-[380px]">
          {/* Mini profile */}
          <MiniProfile />

          {/* Suggestion */}
          <Suggestions />
        </div>
      </section>
    </main>
  );
}
