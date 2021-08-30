import React from "react";
import { Redirect, Route } from "react-router-dom";
import {staticPaths} from '../STORE/constants';


const {homePath} = staticPaths;

interface schema {
  exact?: boolean;
  path: string;
  component: React.FunctionComponent<any>;
  condition: boolean;
}
export default function PrivateRoute({
  exact,
  path,
  component,
  condition,
}: schema) {
  if (condition)
    return <Route path={path} exact={exact ?? false} component={component} />;

  return <Redirect to={homePath} />;
}
