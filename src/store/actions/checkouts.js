import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addCheckout = (checkout) => (dispatch, getState) => {
  //get user data
  const user = getState().auth.authData;
  axios
    .post(`http://localhost:3001/checkouts`, {
      ...checkout,
      issuer_id: user.Id,
    })
    .then((checkout) => {
      console.log("from action", checkout);
      dispatch({
        type: actionTypes.ADD_CHECKOUT,
        pyload: checkout.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
