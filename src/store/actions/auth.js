import * as actionTypes from "./actionTypes";
import axios from "axios";

export const loginSuccess=(data)=>{
  return {
    type: actionTypes.LOGIN_SUCCESS,
    Palyod: data
  }
}


export const loginError=(data)=>{
  return {
    type: actionTypes.LOGIN_FAILED,
    Palyod: data
  }
}


export const login = (values) => dispatch=>{
      axios.post(`http://localhost:3001/login`,{email:values.email,password:values.password})
      .then(user =>
        dispatch({
          type: actionTypes.SIGN_IN,
          Palyod: user.data,
        }))
        .then(user => {
          console.log(user.Palyod)
          localStorage.setItem("flagForLoggedIn", "true");
          localStorage.setItem("userEmail", user.Palyod.user.email)
          localStorage.setItem("userName", user.Palyod.user.name)
          localStorage.setItem("userPassword", user.Palyod.user.password)
          dispatch(loginSuccess(user.Palyod.message));
        })
        .catch(errors => {
          dispatch( loginError(errors.response.data.errors));
        })
  }

  export const logout = () => {
    return {
      type: actionTypes.LOGOUT,
    }
  }
