import React, { Fragment, useEffect } from "react";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";

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
         <p></p>
        </div>
        <h2 className="homeHeading">FEATURED PRODUCTS</h2>
        <div className="container" id="container">
          {products && 
           products.map((product) => (
           <ProductCard key={product._id} product={product} />
           ))}
        </div>
      </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
