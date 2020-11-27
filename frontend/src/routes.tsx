import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Events from "./pages/Events";
import Create from "./pages/Events/Create";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Events} />
        <Route path="/create" component={Create} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
