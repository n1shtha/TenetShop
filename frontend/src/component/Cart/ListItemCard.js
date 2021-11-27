import React from "react";
import "./ListItemCard.css";
import { Link } from "react-router-dom";

const ListItemCard = ({ item, deleteListItems }) => {
  return (
    <div className="ListItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteListItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default ListItemCard;
