import React, {memo} from "react";

interface schema{
    about: string;
    setAbout: (arg: string) => void
}
const AboutForPostAd = ({about, setAbout}:schema) => {

  return (
    <div className={"postAdMain-form-field"}>
      <h3>About</h3>
      <textarea
        value={about || ""}
        onChange={(e: any) => setAbout(e.target.value)}
        className={'post-ad-textarea'}
      />
    </div>
  );
}


export default memo(AboutForPostAd);