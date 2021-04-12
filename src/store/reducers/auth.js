import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
    authData: null,
    error: null,
    message: null,
    isLogin: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return updateObject(state, {
                authData: action.Palyod.user,
                isLogin: true,
            });
         case actionTypes.LOGIN_SUCCESS:
            return updateObject(state, {error: null,message: action.Palyod});
          
        case actionTypes.LOGIN_FAILED:
            return updateObject(state,{ isLogin: false,authData: null,error:action.Palyod, message: null});  
            
        case actionTypes.LOGOUT:
            return updateObject(state,{authData: null, isLogin: false,error: null,message: null});      
        
        default:
            return state;
    }
};

export default reducer;