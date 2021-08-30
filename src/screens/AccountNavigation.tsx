import React from "react";
import { Route, Switch } from "react-router";
import AccountScreen from "./AccountScreen";
import FavoritesScreen from "./FavoritesScreen";
import MyAdsScreen from "./MyAdsScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import PostAdScreen from "./PostAdScreen";
import ChatScreen from "./ChatScreen";
import AffiliatesNavigation from "./AffiliatesNavigation";
import PrivateRoute from "./PrivateRoute";
import { getIsAffiliate } from "../STORE/selectors";
import { useSelector } from "react-redux";
import {staticPaths} from '../STORE/constants';


const {accountPath, postAdPath, myAdsPath, myOrdersPath, favoritesPath, chatPath, affiliatesPath} = staticPaths;


export default function AccountNavigation() {
    const isAffiliate = useSelector(getIsAffiliate);
    
  return (
    <Switch>
      <Route
        exact={true}
        path={accountPath}
        component={AccountScreen}
      />
      <Route
        exact={true}
        path={postAdPath}
        component={PostAdScreen}
      />
      <Route
        exact={true}
        path={myAdsPath}
        component={MyAdsScreen}
      />
      <Route
        exact={true}
        path={myOrdersPath}
        component={MyOrdersScreen}
      />
      <Route
        exact={true}
        path={favoritesPath}
        component={FavoritesScreen}
      />
      <Route
        exact={true}
        path={chatPath}
        component={ChatScreen}
      />
      <PrivateRoute
        path={affiliatesPath}
        component={AffiliatesNavigation}
        condition={isAffiliate}
      />
    </Switch>
  );
}
