import React from "react";
import "./css/InsertFiles.css";

import { MdCancel } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { PulseLoader } from "react-spinners";
import { picturesSchema } from "../types";
import { messagesTypes } from "../STORE/constants";

interface schema {
  allFiles: picturesSchema[];
  setAllFiles: (arg: any) => void;
  onSend?: () => void;
}

export default function InsertFiles({ allFiles, setAllFiles, onSend }: schema) {
  const removeFromFiles = (id: string) => {
    setAllFiles((prevFiles: picturesSchema[]) =>
      prevFiles.filter((prevFile) => prevFile.id !== id)
    );
  };
  return (
    <div id={"chatInput-file-container"}>
      {allFiles.map((file, index) => (
        <div key={index} className={"img-files"}>
          <span
            className={"chatInput-cancel-icon button"}
            onClick={() => removeFromFiles(file.id)}
          >
            <MdCancel />
          </span>

          {file.fileType === messagesTypes.image ? (
            <img src={file.local} alt="img" className={"img-files-img"} />
          ) : file.fileType === messagesTypes.video ? (
            <video src={file.local} className={"img-files-img"} />
          ) : null}
          {file.loading && (
            <div style={{ display: "flex" }} className={"global-override"}>
              <PulseLoader size={10} color={"#c4a459"} loading={true} />
            </div>
          )}
          {file.error && (
            <div style={{ display: "flex" }} className={"global-override"}>
              <BiError size={30} color={"red"} />
            </div>
          )}
        </div>
      ))}

      {!!onSend && !!allFiles.length && !allFiles.some((file) => file.loading) && (
        <span className={"chatInput-send button"} onClick={onSend}>
          Send
        </span>
      )}
    </div>
  );
}
