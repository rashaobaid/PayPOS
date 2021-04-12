import * as actionTypes from "./actionTypes";
import axios from "axios";

export const setCategories = (categories) => {
  return { type: actionTypes.SET_CATEGORIES, categories: categories };
};
export const createCategoryError = (data) => {
  return {
    type: actionTypes.GET_TODO_ERROR,
    pyload: data
  }
}


export const fetchCategories = () => dispatch => {
  axios.get(`http://localhost:3001/categories`)
    .then((result) => {
      dispatch(setCategories(result.data));
    });
};

export const createCategorySuccess = (data) => {
  return {
    type: actionTypes.GET_TODO_SUCCESS,
    pyload: data
  }
}
export const addCategory = (category) => dispatch => {
  axios.post(`http://localhost:3001/category`, { name: category })
    .then(category =>
      dispatch({
        type: actionTypes.ADD_CATEGORY,
        pyload: category.data,
      })
    )
    .then(category => {
      dispatch(createCategorySuccess(category.pyload.message));
    })
    .catch(errors => {
      dispatch(createCategoryError(errors.response.data.errors[0].error));
    })
};

export const deleteCategoryById = (id) => dispatch => {
  axios.delete(`http://localhost:3001/category/${id}`)
    .then((result) => {
      console.log(result.data)
      dispatch({
        type: actionTypes.DELETE_CATEGORY,
        category: id,
      })
    });
};



export const editCategoryById = (categoryId, updatedCategoryName) => dispatch => {
  axios.put(`http://localhost:3001/category/${categoryId}`, { name: updatedCategoryName })
    .then(category =>
      dispatch({
        type: actionTypes.EDIT_CATEGORY,
        pyload: category.data,
      }))
    .then(category => {
      dispatch(createCategorySuccess(category.pyload.message));
    })
    .catch(errors => {
      dispatch(createCategoryError(errors.response.data.errors[0].error));
    })
};

export const calculcateFilterdItems = (filterText) => dispatch => {
  console.log("from action", filterText)
  dispatch({
    type: actionTypes.FILTERD_CATEGORIES,
    pyload: filterText,
  })
}

export const handleclearFilterText = (filterText) => dispatch => {

  dispatch({
    type: actionTypes.TEXT_FILTERD,
    pyload: filterText,
  })
}

export const closeDialog = () => dispatch => {
  dispatch({
    type: actionTypes.CLOSE_DIALOG,
  })
};