import React, { useState, useEffect, useRef } from "react";
import "./css/ProfileBox.css";

import {
  AiFillEdit,
  AiFillCheckCircle,
  AiFillPicture,
  AiFillCloseCircle,
} from "react-icons/ai";

import { IconContext } from "react-icons";
import {
  setSnackBar,
  updateImage,
  updateName,
  updateNameAndImage,
} from "../../STORE/actions";
import { useSelector, useDispatch } from "react-redux";
import { stateTypes } from "../../types";
import ActivityIndicator from "../ActivityIndicator";

import { IconButton } from "@material-ui/core";
import EmailAndContact from "../EmailAndContact";
import { noDisplay } from "../../STORE/constants";

interface profileSchema {
  firebase: any;
  local: string;
}

export default function ProfileBox() {
  const { displayName, photoURL, isLoggedIn } = useSelector(
    (state: stateTypes) => state.userInfo
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  const [profilePic, setProfilePic] = useState<profileSchema>({
    firebase: "",
    local: "",
  });
  const [editName, setEditName] = useState("");

  const updatePicRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProfilePic({
      firebase: "",
      local: photoURL ?? noDisplay,
    });
    setEditName(displayName ?? "");

    // eslint-disable-next-line
  }, [updateProfile, displayName, photoURL]);

  const renderUpdateProfile = ({ type }: { type: string }) => {
    if (!isLoggedIn) return;

    switch (type) {
      case "editName":
        return dispatch(
          updateName({
            newName: editName,
            Then: resetState,
            Catch: resetState,
            InvalidRequest: resetState,
          })
        );
      case "editPic": {
        return dispatch(
          updateImage({
            firebasePic: profilePic.firebase,
            type,
            Then: resetState,
            Catch: resetState,
            InvalidRequest: resetState,
          })
        );
      }
      case "editName&Pic":
        return dispatch(
          updateNameAndImage({
            newName: editName,
            type,
            firebasePic: profilePic.firebase,
            Then: resetState,
            Catch: resetState,
            InvalidRequest: resetState,
          })
        );
      // case "editEmail":
      // return updateEmail({ updatedStateLength });
      // case 'editContact':
      //   return user.v
    }
  };

  const doneScene = () => {
    if (!isLoggedIn) return;
    let updatedState = [];
    const name = displayName ?? "";

    const photo = photoURL ?? noDisplay;

    if (editName !== name) updatedState.push("editName");

    if (profilePic.local !== photo) updatedState.push("editPic");
    if (
      updatedState.indexOf("editName") > -1 &&
      updatedState.indexOf("editPic") > -1
    ) {
      updatedState = updatedState.filter(
        (item) => item !== "editName" && item !== "editPic"
      );
      updatedState.push("editName&Pic");
    }

    if (!updatedState.length) {
      setUpdateProfile(false);
      return;
    }

    setLoading(true);

    updatedState.forEach((type) => {
      renderUpdateProfile({ type });
    });
  };

  const onPictureChange = (e: any) => {
    if (!e.target?.files?.length) return;
    const file = e.target.files[0];
    const type = file?.type?.split("/").shift().toLowerCase();
    if (!(type === "image")) {
      dispatch(setSnackBar(`File type ${type} not supported!`));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (E: any) => {
      setProfilePic({
        firebase: file,
        local: E.target.result,
      });
    };

    if (updatePicRef.current?.value) {
      updatePicRef.current.value = "";
    }
  };

  const resetState = () => {
    setUpdateProfile(false);
    setLoading(false);
  };

  return (
    <IconContext.Provider value={{ size: "20px", color: "var(--textColor3)" }}>
      <div id={"profile-box-container"}>
        <ActivityIndicator loading={loading} />
        <input
          ref={updatePicRef}
          style={{ display: "none" }}
          type={"file"}
          accept="image/*"
          onChange={onPictureChange}
        />
        <div id={"profile-image-box"}>
          <div id={"profile-image-container"}>
            <img src={profilePic.local} alt={"profile_image"} />
            {updateProfile && (
              <span
                id={"edit-profile-pic"}
                onClick={() => updatePicRef.current?.click()}
              >
                <span className={"button"}>
                  <AiFillPicture color={"#fff"} />
                </span>
              </span>
            )}
          </div>

          {updateProfile ? (
            <input
              type={"text"}
              value={editName}
              onChange={(e: any) => setEditName(e.target.value)}
              placeholder={"Name"}
            />
          ) : (
            <label>{displayName || "No Name"}</label>
          )}
          {updateProfile ? (
            <div
              className={"profileBox-flex"}
              style={{ justifyContent: "center" }}
            >
              <IconButton onClick={doneScene}>
                <AiFillCheckCircle color={"blue"} />
              </IconButton>
              <IconButton onClick={() => setUpdateProfile(false)}>
                <AiFillCloseCircle color={"red"} />
              </IconButton>
            </div>
          ) : (
            <IconButton onClick={() => setUpdateProfile(true)}>
              <AiFillEdit />
            </IconButton>
          )}
        </div>

        <EmailAndContact />
      </div>
    </IconContext.Provider>
  );
}
