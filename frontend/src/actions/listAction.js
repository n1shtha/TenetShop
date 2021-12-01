import axios from "axios";
import { ADD_TO_LIST, REMOVE_LIST_ITEM } from "../constants/listConstants";

// Add to list

export const addItemsToList = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_LIST,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("listItems", JSON.stringify(getState().list.listItems));
};

// Remove from list

export const removeItemsFromList = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_LIST_ITEM,
    payload: id,
  });

  localStorage.setItem("listItems", JSON.stringify(getState().list.listItems));
};
