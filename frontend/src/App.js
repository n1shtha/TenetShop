import "./App.css";
import React from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails"; 
import LoginSignup from "./component/User/LoginSignup.js";
import Products from "./component/Product/Products.js";

function App() {
  return (
    <Router>
      <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
      <Footer />
    </Router>
  );
}

export default App;
