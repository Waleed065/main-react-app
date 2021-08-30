import React, { memo } from "react";

interface schema{

    setTitle: (arg: string) => void
}
const TitleForAd = ({ setTitle}:schema) =>{

  return (
    <div className={"postAdMain-form-field"}>
      <h3>Choose A Title</h3>
      <input
        type="text"
        placeholder={"Please enter your product's title"}

        onChange={(e: any) => setTitle(e.target.value)}
        className="form-input"
      />
    </div>
  );
}


export default memo(TitleForAd)