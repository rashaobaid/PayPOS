import React, {Fragment,useEffect} from 'react'
import { Login,Navigator } from "./Components";
import { MainPage, CategoriesPage,ProductsPage } from "./Pages";
import {  Switch, Route, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
function App({isLogin}) {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if(isLogin && location.pathname == '/login') history.replace('/main')
    else if(!isLogin && location.pathname != '/login') history.replace('/login')  
  }, [isLogin])
  return(
    <Fragment>
      {isLogin && <Navigator/>}
      <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/categories" component={CategoriesPage} />
        <Route exact path="/products" component={ProductsPage} />
        <Route exact path="/login" component={Login}/>
      </Switch>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return { 
    isLogin:state.auth.isLogin,
   
   }
};
export default connect(mapStateToProps)(App);





