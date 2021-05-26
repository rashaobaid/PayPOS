import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import categoriesReducer from "./store/reducers/categories";
import authReducer from "./store/reducers/auth";
import productsReducer from "./store/reducers/products";
import checkoutsReducer from './store/reducers/checkouts'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { PersistGate } from 'redux-persist/integration/react'


const rootReducer = combineReducers({
  categories: categoriesReducer,
  auth: authReducer,
  products:productsReducer,
  checkouts:checkoutsReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}
const composeEnhancers =
  (window ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor =persistStore(store)
const app = (
  <BrowserRouter>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>    
      </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

