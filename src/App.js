import React, { Fragment, useEffect, useState } from "react";
import { Login, Navigator, POS, Profile } from "./Components";
import { MainPage, CategoriesPage, ProductsPage } from "./Pages";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import SnackbarProvider from "./customHooks/snackbarContext/SnackbarProvider";
import Toast from "./Components/Toast/Toast";

function App({ isLogin }) {
  const history = useHistory();
  const location = useLocation();
  const [isPos, setIsPos] = useState(false);
  useEffect(() => {
    if (isLogin && location.pathname === "/login") history.replace("/main");
    else if (!isLogin && location.pathname !== "/login")
      history.replace("/login");
  }, [isLogin]);
  useEffect(() => {
    setIsPos(location.pathname === "/pos");
  }, [location.pathname]);
  return (
    <Fragment>
      <SnackbarProvider>
        {isLogin && !isPos && <Navigator />}
        <Switch>
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/categories" component={CategoriesPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/pos" component={POS} />
          <Route path="/profile" component={Profile} />
        </Switch>
        <Toast />
      </SnackbarProvider>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
  };
};
export default connect(mapStateToProps)(App);
