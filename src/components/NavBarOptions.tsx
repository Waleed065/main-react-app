import React from "react";
import {
  Badge,
  Button,
  Hidden,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavLinks } from "../STORE/constants";
import { getTotalOrders } from "../STORE/selectors";
import { stateTypes } from "../types";
import usePrepareLink from "../utils/usePrepareLink";

export default function NavBarOptions() {
  const classes = useStyles();

  const isLoggedIn = useSelector(
    (state: stateTypes) => state.userInfo.isLoggedIn
  );
  const totalOrders = useSelector(getTotalOrders);

  const cartLink = usePrepareLink(useNavLinks.cart);
  const logInLink = usePrepareLink(useNavLinks.logIn);
  const logOutLink = usePrepareLink(useNavLinks.logOut);

  return (
    <Hidden smDown implementation="css">
      <div id={"navBar-flex"}>
        {isLoggedIn && (
          <Link className={"navBar-link"} to={"/account"}>
            <Tooltip title="Account">
              <Button color={"inherit"}>Account</Button>
            </Tooltip>
          </Link>
        )}

        {isLoggedIn ? (
          <Link className={"navBar-link"} to={logOutLink}>
            <Tooltip title="Log Out">
              <Button
                className={classes.logButton}
                color={"inherit"}
                variant={"outlined"}
                startIcon={<FiLogOut />}
              >
                Log-Out
              </Button>
            </Tooltip>
          </Link>
        ) : (
          <Link className={"navBar-link"} to={logInLink}>
            <Tooltip title="Log In">
              <Button
                className={classes.logButton}
                color={"inherit"}
                variant={"outlined"}
                startIcon={<FiLogIn />}
              >
                Log-In
              </Button>
            </Tooltip>
          </Link>
        )}

        <Link className={"navBar-link"} to={cartLink}>
          <IconButton>
            <Tooltip
              title="Orders"
              PopperProps={{
                popperOptions: {
                  modifiers: {
                    offset: {
                      offset: "0, 5px",
                    },
                  },
                },
              }}
            >
              <Badge badgeContent={totalOrders} color="error">
                <AiOutlineShoppingCart size={25} color={"var(--textColor1)"} />
              </Badge>
            </Tooltip>
          </IconButton>
        </Link>
      </div>
    </Hidden>
  );
}

const useStyles = makeStyles({
  logButton: {
    background: "var(--primaryThemeColorDarkGradient)",
    color: "var(--textColor1) !important",
    border: "1px solid var(--textColor1)",
  },
});
