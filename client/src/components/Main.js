import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import User from "./User";
import Admin from "./admin/Admin";
import LogIn from "./admin/LogIn";
import NotFound from "./NotFound";

// COMPONENT

const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/user/:id" component={User} />
      <Route path="/admin/" exact component={Admin} />
      <Route path="/login/" exact component={LogIn} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;
