import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
        ): (
        <Fragment>
        <MetaData title="TENET" />
        <div className="banner">
          <p>WELCOME TO TENET</p>
          <h1>Diwali Sale ongoing!</h1>
        </div>
        <h2 className="homeHeading">FEATURED PRODUCTS</h2>
        <div className="container" id="container">
          {products && 
           products.map((product) => (
           <Product product={product} />
           ))}
        </div>
      </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
