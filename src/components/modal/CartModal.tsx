import React from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Cart from "../../screens/Cart";
import useGetPopupState from "../../utils/useGetPopupState";
import {GET_ENUMS, useNavLinks} from '../../STORE/constants'
import usePrepareLink from "../../utils/usePrepareLink";

export default function CartModal() {
  const { mountedPopup, isOpen } = useGetPopupState();
  const cartLink = usePrepareLink(useNavLinks.cart);
  const history = useHistory();

  const open = mountedPopup === GET_ENUMS.show.cart && isOpen;
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={() => history.goBack()}
      onOpen={() => history.push(cartLink)}
    >
      <div id={"cart-hydrogen-bomb"}>
        <Cart />
      </div>
    </SwipeableDrawer>
  );
}
