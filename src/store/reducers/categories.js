import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  categories: {},
  error: null,
  message: null,
  loading: false,
  flltered_data:{},
  filter_text:'', 
};
const reducer = (state = initialState, action) => {
  let flltered_data = {};
  switch (action.type) {

    case actionTypes.FETCH_CATEGORIES:
      return updateObject(state, { loading: true, });

    case actionTypes.ADD_CATEGORY:
      const category = action.pyload.category;
      let categories = { ...state.categories, [category.Id.toString()]: category } 
      flltered_data = Object.fromEntries(Object.entries(categories).filter(([cat_id, category]) => (category.name).toLowerCase().includes(state.filter_text)));
      return updateObject(state, { categories, flltered_data});


    case actionTypes.GET_TODO_ERROR:
      return updateObject(state, {error: action.pyload,message: null});

    case actionTypes.GET_TODO_SUCCESS:
      return updateObject(state,{error: null, message: action.pyload});


    case actionTypes.DELETE_CATEGORY:
      const id = action.category
      let filter_categories = Object.fromEntries(Object.entries(state.categories).filter(([key, value]) => key.toString() !== id.toString()));      
      flltered_data = Object.fromEntries(Object.entries(filter_categories).filter(([cat_id, category]) => (category.name).toLowerCase().includes(state.filter_text)));
      return updateObject(state, { categories: filter_categories,flltered_data });


    case actionTypes.EDIT_CATEGORY:
      const categoryEdit = action.pyload.category;
      let categoriesEdit = { ...state.categories, [categoryEdit.Id.toString()]: categoryEdit }
      flltered_data = Object.fromEntries(Object.entries(categoriesEdit).filter(([cat_id, category]) => (category.name).toLowerCase().includes(state.filter_text)));
      return updateObject(state, { categories: categoriesEdit, flltered_data});

    case actionTypes.CLOSE_DIALOG:
        return updateObject(state,{error: null, message: null });

    case actionTypes.FILTERD_CATEGORIES:
        let filter_text=action.pyload
        let filteredItems= filter_text === '' ? state.categories : 
            Object.fromEntries(Object.entries(state.categories).filter(([cat_id, category]) => (category.name).toLowerCase().includes(filter_text)));
        return updateObject(state,{flltered_data:filteredItems, filter_text}); 

    case actionTypes.SET_CATEGORIES:
      return updateObject(state, { categories: action.categories, loading: true, }); 

    case actionTypes.TEXT_FILTERD:
      console.log(action)
      return updateObject(state,{filter_text:action.pyload}); 
    default:
      return state;
  }
};
export default reducer;