import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
    products: {},
    loading: false,
    flltered_data: {},
    filter_text: '',
    error: '',
    message: ''
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS:
            return updateObject(state, { products: action.Palyod, loading: true });

        case actionTypes.DELETE_PRODUCT:
            const id = action.Palyod
            let filter_products = Object.fromEntries(Object.entries(state.products).filter(([key, value]) => key.toString() !== id.toString()));
            return updateObject(state, { products: filter_products });

        case actionTypes.FILTERD_PRODUCTS:
            let filter_text = action.Plyoad
            let filteredItems = filter_text === '' ? state.products :
                Object.fromEntries(Object.entries(state.products).filter(([product_id, product]) => (product.code).toLowerCase().includes(filter_text) || (product.categoryName).toLowerCase().includes(filter_text) || (product.description).toLowerCase().includes(filter_text) || (product.stockCount).toLowerCase().includes(filter_text) || (product.price).toLowerCase().includes(filter_text)));
            return updateObject(state, { flltered_data: filteredItems, filter_text });

        case actionTypes.GET_TODO_ERROR:
            return updateObject(state, { error: action.pyload, message: null });

        case actionTypes.GET_TODO_SUCCESS:
            return updateObject(state, { error: null, message: action.pyload });

        case actionTypes.ADD_PRODUCT:
            const product = action.pyload.product;
            let products = { ...state.products, [product.Id]: product }
            return updateObject(state, { products });

        case actionTypes.CLOSE_DIALOG:
            return updateObject(state, { error: null, message: null });

        case actionTypes.EDIT_PRODUCTS:
            const productEdit = action.pyload.product;
            let productsEdit = { ...state.products, [productEdit.Id.toString()]: productEdit }
            return updateObject(state, { products: productsEdit });

        default:
            return state;
    }

};

export default reducer;