import React, { useRef } from "react";
import Compressor from "compressorjs";
import { IoMdPhotos } from "react-icons/io";
import { v4 as uuid } from "uuid";
import InsertFiles from "../InsertFiles";
import { picturesSchema } from "../../types";

interface schema {
  pictures: picturesSchema[];
  setPictures: (arg: picturesSchema[] | any) => void;
}

const PhotosForAd = ({ pictures, setPictures }: schema) => {
  const picturesInputRef = useRef<HTMLInputElement>(null);

  const onPictureChange = async (e: any) => {
    Object.values(e.target.files).forEach((file: any) => {
      const type = file.type.split("/").shift().toLowerCase();
      if (!(type === "image")) {
        alert(`File type ${type} not supported!`);
        return;
      }
      const id = uuid();
      new Compressor(file, {
        quality: 0.6,
        success: (res) => {
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onload = async (E: any) => {
            setPictures((prevState: picturesSchema[]) =>
              prevState.concat({
                firebase: res,
                fileType: type,
                local: E.target.result,
                loading: false,
                error: false,
                id,
              })
            );
          };
        }})
    });

    if (picturesInputRef.current?.value) {
      picturesInputRef.current.value = "";
    }
  };


  // console.log(picturesInputRef.current?.value);
  // console.log(picturesInputRef.current?.files);

  return (
    <div className={"postAdMain-photos-field"}>
      <h3>Photos</h3>
      <InsertFiles allFiles={pictures} setAllFiles={setPictures} />
      <div
        className={"postAdMain-photos-field-inner button"}
        onClick={() => picturesInputRef.current?.click()}
      >
        <span>
          <IoMdPhotos size={30} color={"var(--primaryThemeColor)"} />
        </span>
        <label>Click here to upload photos</label>
        <input
          ref={picturesInputRef}
          style={{ display: "none" }}
          type={"file"}
          accept="image/*"
          multiple
          onChange={onPictureChange}
        />
      </div>
    </div>
  );
};

export default PhotosForAd;
