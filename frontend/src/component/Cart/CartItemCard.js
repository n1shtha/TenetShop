import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems, addToWishlist }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <span>
          <p onClick={() => deleteCartItems(item.product)}>Remove</p>
          <p onClick={() => addToWishlist(item.product, item.quantity)}>
            Add to wishlist
          </p>
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;
