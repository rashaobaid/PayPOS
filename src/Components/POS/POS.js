import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  IconButton,
  Grid,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import ClientHeader from "./ClientHeader";
import ProductOrders from "./ProductsOrders/ProductOrders";
import ProductsPanel from "./PosProducts/Products/Products";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  bar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#efefef",
    boxShadow: "none",
  },
  tab: {
    margin: "0.1em",
    minWidth: "6em",
    borderRadius: "3px",
    border: "1px solid silver",
    backgroundColor: "#e8e8e9",
  },
  iconButton: {
    backgroundColor: "#a1a1a1f2",
    borderRadius: "0.1em",
    color: "#ffffff",
    marginLeft: "0.1em",
    "&:hover": {
      backgroundColor: "#5d6d78",
    },
  },
  marginAround: {
    margin: 5,
    backgroundColor: "#efefef",
  },
  closeIcon: {
    position: " absolute",
    zIndex: "1",
    color: "white",
    right: "0px",
    top: "-2px",
    backgroundColor: "red",
    borderRadius: 0,
    padding: " 2px",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

const POS = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [carts, setCarts] = useState([]);

  const [state, setState] = React.useState({
    open: false,
    message: "",
    position: { vertical: "top", horizontal: "center" },
    severity: "error",
  });

  const { message, open, position, severity } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const addToCart = (product, quantity = 1) => {
    //get current cart
    if (value < carts.length) {
      // we have active tab change this tab
      let new_carts = [...carts];
      let index = new_carts[value].findIndex(
        (cart_item) => cart_item.Id === product.Id
      );
      const product_item = { ...product, quantity };
      if (index === -1) {
        new_carts[value] = [...new_carts[value], product_item];
      } else {
        new_carts[value][index].quantity += quantity;
      }
      setCarts(new_carts);
    } else {
      // no tabs or having tabs issue
      setState({
        open: true,
        message: "Can't add this item! please make sure to create a new order",
        position: { vertical: "top", horizontal: "center" },
        severity: "error",
      });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancle = () => {
    const all_carts = [...carts];
    all_carts.splice(value, 1);
    setCarts(all_carts);
    const all_tabs = [...tabs];
    all_tabs.splice(value, 1);
    setTabs(all_tabs);
    setValue(value === 0 ? 0 : value - 1);
  };

  const addNewTab = () => {
    if (tabs.length === 0) setValue(0);
    const date = new Date();
    setCarts([...carts, []]); // add new array to this tab "this is tab-cart"
    setTabs([...tabs, { name: date.toLocaleTimeString() }]);
  };

  const deleteLastTab = () => {
    if (value !== 0 && value === tabs.length - 1) {
      setValue(tabs.length - 2);
    }

    setCarts(carts.slice(0, carts.length - 1)); // remove last cart as its deleted
    setTabs(tabs.slice(0, tabs.length - 1));
  };

  const handleRemoveItemFromCart = (product_id) => {
    let new_carts = [...carts];
    new_carts[value] = new_carts[value].filter(
      (cart_item) => cart_item.Id !== product_id
    );
    setCarts(new_carts);
  };

  const handleUpdateCartQyn = (product_id, quantity) => {
    if (quantity > 0) {
      let cart_arr = [...carts];
      const index = cart_arr[value].findIndex(
        (cart_item) => cart_item.Id === product_id
      );
      cart_arr[value][index] = { ...cart_arr[value][index], quantity };
      setCarts([...cart_arr]);
    } else {
      handleRemoveItemFromCart(product_id);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={position}
        open={open}
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <IconButton className={classes.closeIcon} component={Link} to="/main">
        {" "}
        <CloseIcon />
      </IconButton>
      <Grid container style={{ position: "relative" }}>
        <Grid item xs={5} sm={5}>
          <div className={classes.marginAround}>
            <AppBar position="static" color="default" className={classes.bar}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                {tabs.map((tab) => (
                  <Tab
                    key={`tab_${tab.name}`}
                    label={tab.name}
                    className={classes.tab}
                  />
                ))}
              </Tabs>
              <IconButton className={classes.iconButton} onClick={addNewTab}>
                +
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={deleteLastTab}
              >
                -
              </IconButton>
            </AppBar>
            {tabs.map((tab, index) => (
              <TabPanel key={`panel_${tab.name}`} value={value} index={index}>
                <ClientHeader />
                <ProductOrders
                  cart={index < carts.length ? carts[index] : []}
                  removeItem={handleRemoveItemFromCart}
                  handleUpdateCartQyn={handleUpdateCartQyn}
                  handleCancle={handleCancle}
                  time={tab.name}
                  setMessage={setState}
                />
              </TabPanel>
            ))}
          </div>
        </Grid>
        <Grid item xs={7} sm={7}>
          <div className={classes.marginAround}>
            <ProductsPanel addToCart={addToCart} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default POS;
