import React,{useState} from "react";
import { Toolbar, Box, Avatar, Button, Typography, AppBar} from "@material-ui/core";
import { Payment, LocalMall, People,Shop,Receipt, AttachMoney, Settings, ShowChart,ExpandMore, ExitToApp } from "@material-ui/icons";
import userStyles from "./style";
import { Link } from 'react-router-dom'
import logo from '../../image/logo.jpg'
import algeria from '../../image/algeria.png'
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";

const Navigator = ({logout}) => {
  const classes = userStyles();


  return (
    <div>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
        <Link to="/main"> <Avatar src={logo} alt="logo"  className={classes.logo}/></Link>
          <Box className={classes.container}>
          <Link to="/main">
            <Payment/>POS 
          </Link>
          <Link to="/products" >
           <LocalMall/>Product
          </Link>
          <Link to="people" >
              <People/>People      
          </Link>
          <Link to="sales" >
              <Shop/>Sales     
          </Link>
          <Link to="/expenses" >
              <AttachMoney/>Expense     
          </Link>
         <Link to="/categories">
              <Receipt/>Categories     
          </Link>
          <Link to="setting" >
              <Settings/>Setting    
          </Link>
          <Link to="reports" >
              <ShowChart/>Reports   
          </Link>
          </Box>
          <div className={classes.grow} />
          <Box className={classes.right}>
          <Button >
             <Avatar alt="Remy Sharp" src="" />
             <Typography className={classes.avater}>admin Don</Typography> 
          </Button>
            <Button>
               <Avatar alt="Remy Sharp" src={algeria}/>
               <ExpandMore/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout:_ => dispatch(authActions.logout()),
  };
};
export default connect(null,mapDispatchToProps)(Navigator);



