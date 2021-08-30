import React from "react";
import "./css/NavBarTemp.css";
import { Button, Hidden, IconButton, Toolbar } from "@material-ui/core";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { logo } from "../../STORE/constants";
import CurrenciesSelect from "../CurrenciesSelect";
import NavBarOptions from "../NavBarOptions";
import { BsSearch } from "react-icons/bs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Notifications from "../Notifications";

interface schema {
  secondaryNav: boolean;
  setMobileOpen: (arg: any) => void;
  setSecondaryNav: (arg: any) => void;
}
export default function NavBarTemp({
  secondaryNav,
  setMobileOpen,
  setSecondaryNav,
}: schema) {

  const handleDrawerToggle = () => {
    setMobileOpen((prevState: boolean) => !prevState);
  };

  return (
    <Toolbar style={{height: 'var(--navbarHeight)'}} >
      <Hidden mdUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
        >
          <AiOutlineMenu color={"var(--textColor1)"} />
        </IconButton>
      </Hidden>
     
      <div id={"navBar-flex"}>
        <Link to="/">
          <Button id="headingLeft">
            <img src={logo} alt={"logo"} width={100} height={22} />
          </Button>
        </Link>

        <SearchBar
          secondaryNav={secondaryNav}
          setSecondaryNav={setSecondaryNav}
        />
      </div>

      <CurrenciesSelect />
      <Notifications />

      <NavBarOptions />
    </Toolbar>
  );
}

interface searchBarSchema {
  secondaryNav: boolean;
  setSecondaryNav: (arg: any) => void;
}
function SearchBar({ secondaryNav, setSecondaryNav }: searchBarSchema) {

  return (
    <SwitchTransition mode={"out-in"}>
      <CSSTransition
        key={!secondaryNav ? "Goodbye" : "Hello"}
        classNames={"searchbar-fade"}
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
        timeout={150}
      >
        {!secondaryNav ? (
          <div
            id={"navbar-search-button"}
            className={"button no-select"}
            onClick={() => setSecondaryNav((prevState: boolean) => !prevState)}
          >
            <label>Search</label>

            <BsSearch size={20} color="var(--primaryThemeColor)" />
          </div>
        ) : (
          <div
          className={'navbar-flex'}
          >
            <label>Tell Us What You Want?</label>
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}