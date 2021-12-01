import React, { Fragment } from "react";
import "./Wishlist.css";
import ListItemCard from "./ListItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToList, removeItemsFromList } from "../../actions/listAction";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { listItems } = useSelector((state) => state.list);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToList(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToList(id, newQty));
  };

  const deleteListItems = (id) => {
    dispatch(removeItemsFromList(id));
  };

  return (
    <Fragment>
      {listItems.length === 0 ? (
        <div className="emptyList">
          {" "}
          <i className="fas fa-heart-broken fa-3x" aria-hidden="true"></i>{" "}
          <p> No products in your wishlist</p>
          <Link to="/products">VIEW PRODUCTS</Link>
        </div>
      ) : (
        <Fragment>
          <div className="listPage">
            <div className="listHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {listItems &&
              listItems.map((item) => (
                <div className="listContainer" key={item.product}>
                  <ListItemCard item={item} deleteListItems={deleteListItems} />
                  <div className="listInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="listSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Wishlist;
