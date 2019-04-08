import React from "react";
import { Route, Switch } from "react-router-dom";
import AddProduct from './components/AddProduct'
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import App from './containers/App'


export default () =>
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/add" component={AddProduct} />
    <Route path="/login" exact component={Login} />

    <Route component={NotFound} />

  </Switch>;
