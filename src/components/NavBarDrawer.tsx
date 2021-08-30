import React from "react";
import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useNavLinks } from "../STORE/constants";
import { getTotalOrders } from "../STORE/selectors";
import usePrepareLink from "../utils/usePrepareLink";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiFillHome,
} from "react-icons/ai";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { stateTypes } from "../types";

interface schema {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export default function NavBarDrawer({ open, setOpen }: schema) {
  const classes = useStyles();
  const isLoggedIn = useSelector(
    (state: stateTypes) => state.userInfo.isLoggedIn
  );
  const totalOrders = useSelector(getTotalOrders);

  const cartLink = usePrepareLink(useNavLinks.cart);
  const logInLink = usePrepareLink(useNavLinks.logIn);
  const logOutLink = usePrepareLink(useNavLinks.logOut);

  const { pathname, search } = useLocation();

  return (
    <SwipeableDrawer
      variant="temporary"
      anchor={"left"}
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <div className={classes.appResponsive}>
        <List>
          <Link
            className={"drawer-link"}
            to={"/"}
            onClick={() => setOpen(false)}
          >
            <ListItem button selected={pathname === "/"}>
              <ListItemIcon>
                <AiFillHome size={25} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>

          {isLoggedIn && (
            <Link
              className={"drawer-link"}
              to={"/account"}
              onClick={() => setOpen(false)}
            >
              <ListItem button selected={pathname === "/account"}>
                <ListItemIcon>
                  <AiOutlineUser size={25} />
                </ListItemIcon>
                <ListItemText primary={"Account"} />
              </ListItem>
            </Link>
          )}

          <Link
            className={"drawer-link"}
            to={cartLink}
            onClick={() => setOpen(false)}
          >
            <ListItem button selected={search === cartLink.search}>
              <ListItemIcon>
                <Badge badgeContent={totalOrders} color="error">
                  <AiOutlineShoppingCart size={25} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {isLoggedIn ? (
            <Link
              className={"drawer-link"}
              to={logOutLink}
              onClick={() => setOpen(false)}
            >
              <ListItem button selected={search === logOutLink.search}>
                <ListItemIcon>
                  <FiLogOut size={25} />
                </ListItemIcon>
                <ListItemText primary={"Log-Out"} />
              </ListItem>
            </Link>
          ) : (
            <Link
              className={"drawer-link"}
              to={logInLink}
              onClick={() => setOpen(false)}
            >
              <ListItem button selected={search === logInLink.search}>
                <ListItemIcon>
                  <FiLogIn size={25} />
                </ListItemIcon>
                <ListItemText primary={"Log-In"} />
              </ListItem>
            </Link>
          )}
        </List>
      </div>
    </SwipeableDrawer>
  );
}

const useStyles = makeStyles({
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",

    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    left: "0",
    right: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    width: 300,
  },

  appResponsive: {
    margin: "20px 10px",
    display: "flex",
    flexDirection: "column",
  },
});
