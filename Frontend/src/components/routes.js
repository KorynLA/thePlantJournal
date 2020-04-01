import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home";
import addPlant from "./addPlant";
import errorPage from "./errorPage";
import Login from "./login"
import AppliedRoute from "./appliedRoute";
import PlantMenu from "./plantMenu";
import PlantView from "./plantView";
import Signup from "./signup";

/***
Creates routes for user to use in navbar. Displayed on every page. 
***/
export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/add" exact component={addPlant} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/plants" exact component={PlantMenu} appProps={appProps} />
      <AppliedRoute path="/plants/:id" exact component={PlantView} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <Route component={errorPage} />
    </Switch>
  );
}