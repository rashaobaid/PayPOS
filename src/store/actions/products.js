import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchProducts = () => dispatch => {
  axios.get(`http://localhost:3001/products`)
    .then((result) => {
      dispatch({
        type: actionTypes.FETCH_PRODUCTS,
        Palyod: result.data,
      })
    })
};

export const deleteProductById = (id) => dispatch => {
  axios.delete(`http://localhost:3001/product/${id}`)
    .then((result) => {
      dispatch({
        type: actionTypes.DELETE_PRODUCT,
        Palyod: id,
      })
    });
};

export const calculcateFilterdItems = (filterText) => dispatch => {
  console.log("from action", filterText)
  dispatch({
    type: actionTypes.FILTERD_PRODUCTS,
    Palyod: filterText,
  })
}

export const addProductError = (data) => {
  return {
    type: actionTypes.GET_TODO_ERROR,
    pyload: data
  }
}

export const addProductSuccess = (data) => {
  return {
    type: actionTypes.GET_TODO_SUCCESS,
    pyload: data
  }
}

export const addProduct = (product) => dispatch => {
  axios.post(`http://localhost:3001/product`,
    {
      ...product,
      price: parseInt(product.price),
      stockCount: parseInt(product.stockCount)
    })
    .then(product =>
      dispatch({
        type: actionTypes.ADD_PRODUCT,
        pyload: product.data,
      }))
    .then(product => {
      dispatch(addProductSuccess(product.pyload.message));
    })
    .catch(errors => {
      dispatch(addProductError(errors.response.data.errors));
    })
};

export const editProductById = (productId, updatedProduct) => dispatch => {
  axios.put(`http://localhost:3001/product/${productId}`, {
     ...updatedProduct,
     price: parseInt(updatedProduct.price),
     stockCount: parseInt(updatedProduct.stockCount)
     })
    .then(product =>
      dispatch({
        type: actionTypes.EDIT_PRODUCTS,
        pyload: product.data,
      }))
      .then(product => {
        dispatch(addProductSuccess(product.pyload.message));
      })
      .catch(errors => {
        dispatch(addProductError(errors.response.data.errors));
      })
};


export const closeDialog = () => dispatch => {
  dispatch({
    type: actionTypes.CLOSE_DIALOG,
  })
};

