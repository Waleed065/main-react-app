import React from "react";
import "./css/PostAd.css";
import PostAdMain from "../components/postAd/PostAdMain";
import FooterContainer from "../components/FooterContainer";

export default function PostAd() {
  return (
    <>
    <div id={"postAd-container"} className={'fade-in'}>
      <img
        src="https://i.pinimg.com/originals/82/4f/d4/824fd4b6b97b0cccc29da48fb4a90e1f.jpg"
        alt="img"
        id={'post-ad-image'}
      />
      <PostAdMain />
    </div>
    <FooterContainer />
    </>
  );
}
