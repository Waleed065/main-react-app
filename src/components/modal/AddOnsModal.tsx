import React, { useState } from "react";
import "./css/AddOns.css";
import AddOnItems from "../homePage/AddOnItems";
import {
  Backdrop,
  Badge,
  Fab,
  Fade,

  makeStyles,
  Modal,
} from "@material-ui/core";
import { modalAnimationTimeOut } from "../../STORE/constants";
import { BsPlusCircleFill } from "react-icons/bs";
import { selectedAddOnType } from "../../types";

interface schema {
  addOns: {
    title: string;
    price: number;
    about: string | null;
  }[];
  selectedAddOns: selectedAddOnType;
  setSelectedAddOns: any;
}
export default function AddOnsModal({
  addOns,
  selectedAddOns,
  setSelectedAddOns,
}: schema) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: modalAnimationTimeOut,
        }}
      >
        <Fade in={isOpen} timeout={modalAnimationTimeOut}>
          <div id={"add-ons-modal"}>
            <AddOnItems
              addOns={addOns}
              selectedAddOns={selectedAddOns}
              setSelectedAddOns={setSelectedAddOns}
            />
          </div>
        </Fade>
      </Modal>
      <span id={"add-ons-fab"}>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          style={{ color: "#fff", position: "relative", marginBottom: 15 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <BsPlusCircleFill style={{ marginRight: 5 }} />
          Add Ons
          <Badge
            style={{ position: "absolute", top: 5, right: 5 }}
            badgeContent={selectedAddOns.length}
            color="error"
          />
        </Fab>
      </span>
    </>
  );
}

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
