import React, { useRef } from "react";
import "./css/Navigation.css";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import OurServicesScreen from "./OurServicesScreen";
import AboutUsScreen from "./AboutUsScreen";
import TermsScreen from "./TermsScreen";
import AffiliateTermsScreen from "../components/affiliates/AffiliateTermsScreen";
import OurServicesItemScreen from "./OurServicesItemScreen";

import GetParameterPopups from "../components/modal/GetParameterPopups";
import PrivateRoute from "./PrivateRoute";
import AlertModal from "../components/AlertModal";
import Snack from "../components/Snack";
import CartModal from "../components/modal/CartModal";
import NavBar from "../components/navbar/NavBar";
import AffiliatesScreen from "./AffiliatesScreen";
import useEffectGlobal from "../utils/useEffectGlobal";
import { useSelector } from "react-redux";
import { stateTypes } from "../types";
import AccountNavigation from "./AccountNavigation";
import {staticPaths} from '../STORE/constants';


const {homePath, affiliatesApplyPath, accountPath, itemsPath, itemPath, aboutPath, termsPath, affiliatesTermsPath} = staticPaths;

export default function Navigation() {
  const isLoggedIn = useSelector(
    (state: stateTypes) => state.userInfo.isLoggedIn
  );
  const bannerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffectGlobal();

  return (
    <div>
      <NavBar
        componentRef={location.pathname === homePath ? bannerRef : undefined}
      />

      <CartModal />

      <Switch>
        <Route path={homePath} exact>
          <HomePage ref={bannerRef} />
        </Route>
        <Route path={`${itemsPath}/:categoryParam`} exact component={OurServicesScreen} />
        <Route path={`${itemPath}/:itemParam`} exact component={OurServicesItemScreen} />

        <Route path={affiliatesApplyPath} exact component={AffiliatesScreen} />
        <PrivateRoute
          path={accountPath}
          component={AccountNavigation}
          condition={isLoggedIn}
        />

        <Route path={aboutPath} exact component={AboutUsScreen} />
        <Route path={termsPath} exact component={TermsScreen} />
        <Route path={affiliatesTermsPath} exact component={AffiliateTermsScreen} />

        <Redirect to={homePath} />
      </Switch>

      <GetParameterPopups />
      <AlertModal />
      <Snack />
    </div>
  );
}
