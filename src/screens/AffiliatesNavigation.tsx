import React from "react";
import "./css/AffiliatesNavigation.css";
import { Route, Switch } from "react-router-dom";
import AffiliatesHeader from "../components/affiliates/AffiliatesHeader";
import AffiliatesDashboard from "../components/affiliates/AffiliatesDashboard";
import AffiliatesGroups from "../components/affiliates/AffiliatesGroups";
import AffiliatesProducts from "../components/affiliates/AffiliatesProducts";
import AffiliatesPerformance from "../components/affiliates/AffiliatesPerformance";
import AffiliatesExtras from "../components/affiliates/AffiliatesExtras";
import { staticPaths } from "../STORE/constants";

const {
  affiliatesDashboardPath,
  affiliatesGroupPath,
  affiliatesProductsPath,
  affiliatesPerformancePath,
  affiliatesExtrasPath,
} = staticPaths;

export default function AffliateScreen() {
  return (
    <div style={{ paddingTop: "var(--navbarHeight)" }}>
      <AffiliatesHeader />

      <Switch>
        <Route
          exact={true}
          path={affiliatesDashboardPath}
          component={AffiliatesDashboard}
        />
        <Route
          exact={true}
          path={affiliatesGroupPath}
          component={AffiliatesGroups}
        />
        <Route
          exact={true}
          path={affiliatesProductsPath}
          component={AffiliatesProducts}
        />
        <Route
          exact={true}
          path={affiliatesPerformancePath}
          component={AffiliatesPerformance}
        />
        <Route
          exact={true}
          path={affiliatesExtrasPath}
          component={AffiliatesExtras}
        />
      </Switch>
    </div>
  );
}
