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
    let flltered_data={}
    let products = null;
    const isFilterRelated = (product) => {
        return ((product.name).toLowerCase().includes(state.filter_text) ||
        (product.code).toLowerCase().includes(state.filter_text) ||
        (product.categoryName).toLowerCase().includes(state.filter_text) ||
        (product.description).toLowerCase().includes(state.filter_text) ||
        (product.stockCount) === (state.filter_text) ||
        (product.price) === (state.filter_text));
    }
    const calculateResult=(data)=>{
       return Object.fromEntries(Object.entries(data).filter(([product_id, product]) => isFilterRelated(product))); 
    }

    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS:
            products= action.Palyod
            flltered_data = calculateResult(products)
            return updateObject(state, { products, flltered_data, loading: true });

        case actionTypes.DELETE_PRODUCT:
            const id = action.Palyod
            let filter_products = Object.fromEntries(Object.entries(state.products).filter(([key, value]) => key.toString() !== id.toString()))
            flltered_data=Object.fromEntries(Object.entries(state.flltered_data).filter(([key, value]) => key.toString() !== id.toString()));
            return updateObject(state, { products: filter_products, flltered_data });

        case actionTypes.FILTERD_PRODUCTS:
            let filter_text = action.Plyoad
            let filteredItems = filter_text === '' ? state.products :
                Object.fromEntries(Object.entries(state.products).filter(([product_id, product]) =>
                    (product.name).toLowerCase().includes(filter_text) ||
                    (product.code).toLowerCase().includes(filter_text) ||
                    (product.categoryName).toLowerCase().includes(filter_text) ||
                    (product.description).toLowerCase().includes(filter_text) ||
                    (product.stockCount) === (filter_text) ||
                    (product.price) === (filter_text)));
            return updateObject(state, { flltered_data: filteredItems, filter_text });

        case actionTypes.TEXT_FILTERD:
            console.log(action)
            return updateObject(state, { filter_text: action.pyload });

        case actionTypes.GET_TODO_ERROR:
            return updateObject(state, { error: action.pyload, message: null });

        case actionTypes.GET_TODO_SUCCESS:
            return updateObject(state, { error: null, message: action.pyload });

        case actionTypes.ADD_PRODUCT:
            const product = action.pyload.product;
            products = { ...state.products, [product.Id]: product }
            return updateObject(state, { products });

        case actionTypes.CLOSE_DIALOG:
            return updateObject(state, { error: null, message: null });

        case actionTypes.EDIT_PRODUCTS:
            const productEdit = action.pyload.product;
            let productsEdit = { ...state.products, [productEdit.Id.toString()]: productEdit }
            flltered_data=calculateResult(productsEdit)
            return updateObject(state, { products: productsEdit,flltered_data });

        default:
            return state;
    }

};

export default reducer;