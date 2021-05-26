import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    checkouts: {},
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_CHECKOUT:
        const checkout = action.pyload.checkout;
        let checkouts = { ...state.checkouts, [checkout.Id]: checkout }
        return updateObject(state, { checkouts });
       
      default:
        return state;
    }
  };
  export default reducer;