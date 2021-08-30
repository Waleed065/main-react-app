import React, { useState } from "react";
import "./css/CopyAid.css";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Zoom } from "@material-ui/core";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { stateTypes } from "../../types";
import { setSnackBar } from "../../STORE/actions";

const allIcons = [
  <FaClipboard color="var(--primaryThemeColor)" size={20} />,
  <FaClipboardCheck color="green" size={20} />,
];

export default function CopyAid() {
  const aid = useSelector((state: stateTypes) => state.affiliate._id);
  const [copied, setCopied] = useState(false);
  const [icon, setIcon] = useState(allIcons[0]);

  const dispatch = useDispatch();

  const onCopy = () => {
    if (icon === allIcons[1]) return;

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIcon(allIcons[1]);
    }, 150);
    setTimeout(() => {
      setIcon(allIcons[0]);
    }, 2500);

    dispatch(setSnackBar("Your AID has been copied!"));
  };

  return (
    <div>
      <h3>Affiliate - ID</h3>
      <div className="affiliates-clipboard-container">
        <p>{aid}</p>
        <CopyToClipboard text={aid} onCopy={onCopy}>
          <Zoom in={!copied} timeout={150}>
            <Fab aria-label="copy" size={"small"}>
              {icon}
            </Fab>
          </Zoom>
        </CopyToClipboard>
      </div>
    </div>
  );
}
