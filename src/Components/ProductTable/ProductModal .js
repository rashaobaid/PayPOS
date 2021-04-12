import React, { useState, useEffect } from 'react';
import { Button, Divider, TextField, Typography,MenuItem, Dialog, FormControl, Select, DialogActions, TextareaAutosize, DialogContent, ButtonGroup, DialogContentText, DialogTitle } from '@material-ui/core';
import userStyles from "./style";
import { Close } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import useForm from './useForm';
import { connect } from "react-redux";
import * as productsActions from "../../store/actions/products";
import * as categoriesActions from "../../store/actions/categories";

const ProductModal = (props) => {
    const { products, categories, id,onInitCategories, isEdit,onEditProduct, onAddProduct, onInitProducts, error, message ,closeDialog} = props
    
    const props_values = isEdit && { ...products[id] }
    
    const { handleChange, values,setValues } = useForm(props_values); // this will provide empty values ! we need props values
    const classes = userStyles();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const closeDiaglogSync = async() => { // async call 
        await onInitProducts();
        await handleClose(); // wait until this job finish 
        closeDialog()  // do this after wards
    }

    useEffect(() => {
        closeDiaglogSync()
    }, [message]) // run again message updated 

    useEffect(() => {
        onInitCategories();
    }, []);

    return (
        <div>
            {isEdit ?
                <Button color="primary" variant="outlined" size="large" onClick={handleClickOpen}>
                    <Edit />
                </Button>
                :
                <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
                    Add Product
                </Button>
            }

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth >
                <form >
                    <DialogTitle className={classes.header}><span className={classes.title}>  {isEdit ? "Edit Category" : "Add Catedory"} <Close onClick={handleClose} /></span></DialogTitle>
                    <DialogContent className={classes.content}>
                        <DialogContentText className={classes.text}> Name</DialogContentText>
                        <TextField
                            autoFocus
                            variant="outlined"
                            placeholder=" Name"
                            fullWidth
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                         {error?.name && <Typography className={classes.errorMesage} >{error.name}</Typography>}
                        <DialogContentText className={classes.text}>Raw Price</DialogContentText>
                        <FormControl variant="outlined" fullWidth>
                            <Select
                                labelId="Raw Price"
                                id="Raw Price"
                                name="rawPrice"
                                value={values.rawPrice?.toString()}
                                onChange={handleChange}
                            >

                                <MenuItem value={1} selected>Standard</MenuItem>
                                <MenuItem value={2}>EURO</MenuItem>
                                <MenuItem value={3}>ILS</MenuItem>
                            </Select>
                            {error?.rawPrice && <Typography className={classes.errorMesage} >{error.rawPrice}</Typography>}
                        </FormControl>
                        <DialogContentText className={classes.text}> Price</DialogContentText>
                        <TextField
                            variant="outlined"
                            fullWidth
                            type="number"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                        />
                        {error?.price && <Typography className={classes.errorMesage} >{error.price}</Typography>}
                        <DialogContentText className={classes.text}> Code</DialogContentText>
                        <TextField
                            variant="outlined"
                            placeholder=" code"
                            fullWidth
                            name="code"
                            value={values.code}
                            onChange={handleChange}
                        />
                         {error?.code && <Typography className={classes.errorMesage} >{error.code}</Typography>}
                        <DialogContentText className={classes.text}> Choose color to Display in POS</DialogContentText>
                        <ButtonGroup variant="contained" aria-label="contained primary button group">
                            <Button>C1</Button>
                            <Button>C2</Button>
                            <Button>C3</Button>
                            <Button color="primary">C4</Button>
                            <Button>C5</Button>
                            <Button >C6</Button>
                            <Button color="secondary">C7</Button>
                        </ButtonGroup>
                        <DialogContentText className={classes.text}> Image</DialogContentText>
                        <div>
                            <Button variant="contained" color="default">
                                Choose File
                        </Button>
                            <span >No file chosen </span>
                        </div>
                        <DialogContentText className={classes.text}> Category</DialogContentText>
                        <FormControl variant="outlined" fullWidth>
                            <Select
                                labelId="category"
                                id="category"
                                name="categoryId"
                                onChange={handleChange}
                                value={values.categoryId}
                            >
                                {Object.entries(categories).map(([index, value]) => {
                                    return (<MenuItem key={index} value={value.Id}>{value.name}</MenuItem>)
                                })
                                }
                            </Select>
                            {error?.category && <Typography className={classes.errorMesage} >{error.category}</Typography>}
                        </FormControl>
                        <DialogContentText className={classes.text}  > Product Description</DialogContentText>
                        <TextareaAutosize rowsMin={12} style={{ width: "100%" }} name="description" value={values.description} onChange={handleChange} aria-label="empty textarea" fullWidth />
                        {error?.description && <Typography className={classes.errorMesage} >{error.description}</Typography>}
                        <DialogContentText className={classes.text}> Stock Count</DialogContentText>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="stockCount"
                            type="number"
                            value={values.stockCount}
                            onChange={handleChange}
                        />
                        {error?.stockCount && <Typography className={classes.errorMesage} >{error.stockCount}</Typography>}
                        <DialogContentText className={classes.text}> expiration Date</DialogContentText>
                        <TextField
                            fullWidth
                            id="expirationDate"
                            variant="outlined"
                            type="date"
                            defaultValue="2017-05-24"
                            name="expirationDate"
                            value={values.expirationDate}
                            onChange={handleChange}
                        />
                         {error?.expirationDate && <Typography className={classes.errorMesage} >{error.expirationDate}</Typography>}
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained">
                            Close
                        </Button>
                        <Button color="primary" variant="contained" type="submit" onClick={(e) => { 
                                e.preventDefault() 
                                isEdit ? onEditProduct(id, values): onAddProduct(values); 
                                }}>
                             { isEdit ?  "Save": "Add" }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        products: state.products.products,
        error: state.products.error,
        message: state.products.message
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAddProduct: (product) => dispatch(productsActions.addProduct(product)),
        onInitCategories: () => dispatch(categoriesActions.fetchCategories()),
        onInitProducts:() => dispatch(productsActions.fetchProducts()),
        closeDialog:()=>dispatch(productsActions.closeDialog()),
        onEditProduct:(id,values)=> dispatch(productsActions.editProductById(id,values)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
