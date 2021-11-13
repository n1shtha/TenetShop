import React, { Fragment } from "react";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name: "CLASSIC ST DAWES",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "1200 INR",
  _id: "product1",
};

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>WELCOME TO TENET</p>
        <h1>Diwali Sale ongoing!</h1>
      </div>
      <h2 className="homeHeading">FEATURED PRODUCTS</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
