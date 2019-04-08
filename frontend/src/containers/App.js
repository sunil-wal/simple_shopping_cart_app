import React from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import "./App.css";
const App = () => (
  <div className="Home">
    <div className="lander">
      <ProductsContainer />
      <hr />
      <CartContainer />
    </div>
  </div>
);

export default App;
