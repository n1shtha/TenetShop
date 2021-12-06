import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="productBadge">
        <button
          className={
            product.stock < 1
              ? "productBadgeNoStock"
              : product.stock < 3
              ? "productBadgeLowStock"
              : "productNoBadge"
          }
        >
          {product.stock < 1
            ? "OUT OF STOCK"
            : product.stock < 3
            ? "LOW IN STOCK"
            : ""}
        </button>
        <button
          className={
            product.counter > 5 ? "productBadgeBest" : "productNoBadge"
          }
        >
          {product.counter > 5 ? "POPULAR" : ""}
        </button>
      </div>
      <img src={product.images[0]?.url} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.brand}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          ({product.numOfReviews} reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
