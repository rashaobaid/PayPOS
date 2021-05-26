import * as actionTypes from "./actionTypes";
import axios from "axios";

export const loginSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    Palyod: data,
  };
};

export const loginError = (data) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    Palyod: data,
  };
};

export const login = (values) => (dispatch) => {
  axios
    .post(`http://localhost:3001/login`, {
      email: values.email,
      password: values.password,
    })
    .then((user) =>
      dispatch({
        type: actionTypes.SIGN_IN,
        Palyod: user.data,
      })
    )
    .then((user) => {
      console.log(user.Palyod);
      dispatch(loginSuccess(user.Palyod.message));
    })
    .catch((errors) => {
      dispatch(loginError(errors.response.data.errors));
    });
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const fetchUserById = (id) => (dispatch) => {
  axios.get(`http://localhost:3001/user/${id.Id}`).then((result) => {
    dispatch({
      type: actionTypes.FETCH_USER,
      Palyod: result.data,
    });
  });
};

export const editUserInfoError = (data) => {
  return {
    type: actionTypes.GET_TODO_ERROR,
    pyload: data,
  };
};
export const editUserInfoSuccess = (data) => {
  return {
    type: actionTypes.GET_TODO_SUCCESS,
    pyload: data,
  };
};

export const editUserInfo = (info) => (dispatch) => {
  let values = {
    ...info,
  };
  let form_data = new FormData();
  for (let key in values) {
    form_data.append(key, values[key]);
  }

  axios
    .put(`http://localhost:3001/user/${info.Id}`, form_data)
    .then((user) =>
      dispatch({
        type: actionTypes.EDIT_USER_INFO,
        pyload: user.data,
      })
    )
    .then((user) => {
      console.log("from action message", user.pyload.message);
      dispatch(editUserInfoSuccess(user.pyload.message));
    })
    .catch((errors) => {
      console.log("from action", errors.response.data.errors);
      dispatch(editUserInfoError(errors.response.data.errors));
    });
};
