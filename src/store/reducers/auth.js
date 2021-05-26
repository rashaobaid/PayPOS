import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  authData: {},
  error: null,
  message: null,
  isLogin: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return updateObject(state, {
        authData: action.Palyod.user,
        isLogin: true,
      });
    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, { error: null, message: action.Palyod });

    case actionTypes.LOGIN_FAILED:
      return updateObject(state, {
        isLogin: false,
        authData: {},
        error: action.Palyod,
        message: null,
      });

    case actionTypes.LOGOUT:
      return updateObject(state, {
        authData: {},
        isLogin: false,
        error: null,
        message: null,
      });

    case actionTypes.FETCH_USER:
      return updateObject(state, { user: action.Palyod });
    case actionTypes.GET_USER_INFO:
      console.log("Here !");
      return state;

    case actionTypes.GET_TODO_ERROR:
      return updateObject(state, { error: action.pyload, message: null });

    case actionTypes.GET_TODO_SUCCESS:
      return updateObject(state, { error: null, message: action.pyload });

    case actionTypes.EDIT_USER_INFO:
      const userEditInfo = action.pyload.user;
      let userEdit = { ...state.authData, ...userEditInfo }; // ITS SINGLE USER !
      return updateObject(state, { authData: userEdit });

    default:
      return state;
  }
};

export default reducer;
