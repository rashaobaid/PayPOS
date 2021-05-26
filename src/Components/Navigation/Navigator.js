import React, { useState } from "react";
import {
  Toolbar,
  Box,
  Avatar,
  Button,
  Typography,
  AppBar,
} from "@material-ui/core";
import {
  Payment,
  LocalMall,
  People,
  Shop,
  Receipt,
  AttachMoney,
  Settings,
  ShowChart,
  ExpandMore,
  ExitToApp,
} from "@material-ui/icons";
import profileImage from "../../image/p4.jpg";
import userStyles from "./style";
import { Link } from "react-router-dom";
import logo from "../../image/logo.jpg";
import flag from "../../image/flag.jpg";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";

const Navigator = ({ logout, authData }) => {
  const classes = userStyles();
  return (
    <div>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Link to="/main">
            {" "}
            <Avatar src={logo} alt="logo" className={classes.logo} />
          </Link>
          <Box className={classes.container}>
            <Link to="/pos">
              <Payment />
              POS
            </Link>
            <Link to="/products">
              <LocalMall />
              Product
            </Link>
            <Link to="people">
              <People />
              People
            </Link>
            <Link to="sales">
              <Shop />
              Sales
            </Link>
            <Link to="/expenses">
              <AttachMoney />
              Expense
            </Link>
            <Link to="/categories">
              <Receipt />
              Categories
            </Link>
            <Link to="setting">
              <Settings />
              Setting
            </Link>
            <Link to="reports">
              <ShowChart />
              Reports
            </Link>
          </Box>
          <div className={classes.grow} />
          <Box className={classes.right}>
            <Link to="/profile">
              <Avatar
                alt="Remy Sharp"
                src={
                  authData.image
                    ? `http://localhost:3001/${authData.image}`
                    : profileImage
                }
              />
              <Typography className={classes.avater}>
                {" "}
                {`${authData.first_name} ${authData.last_name}`}
              </Typography>
            </Link>

            <Button>
              <Avatar alt="Remy Sharp" src={flag} />
              <ExpandMore />
            </Button>
            <Link to="login" onClick={logout}>
              <ExitToApp />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    authData: state.auth.authData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (_) => dispatch(authActions.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
