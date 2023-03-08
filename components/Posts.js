import React from "react";
import nyan from "../public/nyan-image.png";
import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: "1",
      username: "codewithnyan",
      userImg: nyan,
      img: "https://images.unsplash.com/photo-1678260748335-542c56c4246a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
      caption: "Nice picture",
    },
    {
      id: "2",
      username: "nyanphamdev",
      userImg: nyan,
      img: "https://images.unsplash.com/photo-1678210111200-73c4675ac986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      caption: "Picture of my ocean",
    },
  ];

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
