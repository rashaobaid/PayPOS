import * as actionTypes from "./actionTypes";
import axios from "axios";
import { act } from "react-dom/test-utils";

export const fetchProducts = () => (dispatch) => {
  axios.get(`http://localhost:3001/products`).then((result) => {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS,
      Palyod: result.data,
    });
  });
};

export const deleteProductById = (id) => (dispatch) => {
  axios.delete(`http://localhost:3001/product/${id}`).then((result) => {
    dispatch({
      type: actionTypes.DELETE_PRODUCT,
      Palyod: id,
    });
  });
};

export const calculcateFilterdItems = (filterText) => (dispatch) => {
  console.log("from action", filterText);
  dispatch({
    type: actionTypes.FILTERD_PRODUCTS,
    Plyoad: filterText,
  });
};

export const handleclearFilterText = (filterText) => (dispatch) => {
  dispatch({
    type: actionTypes.TEXT_FILTERD,
    pyload: filterText,
  });
};

export const addProductError = (data) => {
  return {
    type: actionTypes.GET_TODO_ERROR,
    pyload: data,
  };
};

export const addProductSuccess = (data) => {
  return {
    type: actionTypes.GET_TODO_SUCCESS,
    pyload: data,
  };
};

export const addProduct = (product) => async (dispatch, getState) => {
  //get user data
  const user = getState().auth.authData;

  let values = {
    ...product,
    price: parseInt(product.price),
    stockCount: parseInt(product.stockCount),
    issuer_id: user.Id,
  };
  let form_data = new FormData();
  for (let key in values) {
    form_data.append(key, values[key]);
  }
  try {
    const product = await axios.post(
      `http://localhost:3001/product`,
      form_data
    );
    //.then((product) => {
    dispatch({
      type: actionTypes.ADD_PRODUCT,
      pyload: product.data,
    });
    dispatch(addProductSuccess(product.data.message));
  } catch (errors) {
    console.log("here with error: ", errors.response);
    dispatch(addProductError(errors.response?.data?.errors));
  }
  //})
  //.catch((errors) => {
  //  console.log("here with error: ", errors);
  //  dispatch(addProductError(errors.response?.data?.errors));
  //});
};

export const editProductById =
  (productId, updatedProduct) => (dispatch, getState) => {
    //get user data
    const user = getState().auth.authData;
    axios
      .put(`http://localhost:3001/product/${productId}`, {
        ...updatedProduct,
        price: parseInt(updatedProduct.price),
        stockCount: parseInt(updatedProduct.stockCount),
        issuer_id: user.Id,
      })
      .then((product) =>
        dispatch({
          type: actionTypes.EDIT_PRODUCTS,
          pyload: product.data,
        })
      )
      .then((product) => {
        dispatch(addProductSuccess(product.pyload.message));
      })
      .catch((errors) => {
        dispatch(addProductError(errors.response.data.errors));
      });
  };

export const closeDialog = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_DIALOG,
  });
};
