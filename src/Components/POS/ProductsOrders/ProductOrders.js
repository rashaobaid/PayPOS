import React, { useState } from 'react'
import { Grid, Paper, TableContainer, TableBody, TableRow, TableCell, Table, Button, InputAdornment,InputBase } from "@material-ui/core";
import ProductOrder from './ProductOrder'
import userStyles from "./style";
import { connect } from "react-redux";
import * as checkoutsActions from "../../../store/actions/checkouts";


const ProductOrders = ({ cart, removeItem, handleUpdateCartQyn, handleCancle, onAddCheckout,time,setMessage }) => {
    const classes = userStyles();
    const [totalTax, setTotalTex] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    

    let totalPrice = cart.reduce((acc, product) => acc + (parseInt(product.price) * parseInt(product.quantity)), 0);
    let totalQuantity = cart.reduce((acc, product) => acc + (parseInt(product.quantity)), 0);

    const calculateTotalTex = (value) => {
        if (value >= 0 && value <= 100) {
            let total = value * totalPrice / 100.0
            setTotalTex(total)
        }
        else {
            setTotalTex(0)
            alert("the value of Tex must grater than zero and less than 100")
        }

    }

    const calculateTotalDiscount = (value) => {
        if (value >= 0 && value <= 100) {
            let total = value * totalPrice / 100.0
            setTotalDiscount(total)
        }
        else {
            setTotalDiscount(0)
            alert("the value of DisCount must grater than zero and less than 100")
        }
    }
    
    return (
        <Grid container>
            <Grid item className={classes.productOrderPaper}>
                <div>product</div>
                <div>price</div>
                <div>quantity</div>
                <div>total</div>
            </Grid>
            <Grid item xs={12}
            >
                {cart.map((product) => <ProductOrder product={product}
                    key={`product_${product.Id}`}
                    removeItem={removeItem}
                    updateCartQuntity={handleUpdateCartQyn}
                    handleCancle={handleCancle}
                />)}
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.PaymentCell}>Sub Total</TableCell>
                            <TableCell >{totalPrice} $</TableCell>
                            <TableCell align="right">{totalQuantity} items</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.PaymentCell}>Ordrt TAX</TableCell>
                            <TableCell >
                                <InputBase
                                    type='number'
                                    onChange={(e) => calculateTotalTex(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            %
                                        </InputAdornment>}>
                                </InputBase>
                            </TableCell>
                            <TableCell align="right">{totalTax} $</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.PaymentCell}>Discount</TableCell>
                            <TableCell ><InputBase type='number'
                                onChange={(e) => calculateTotalDiscount(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        %
                                </InputAdornment>
                                }></InputBase> </TableCell>
                            <TableCell align="right">{totalDiscount} $</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.PaymentCell}>Total</TableCell>
                            <TableCell style={{ color: 'green' }}>{(totalPrice + totalTax - totalDiscount).toFixed(3)} $</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleCancle()} >
                    cancel
               </Button>
                <Button variant="contained"
                    className={classes.button}
                    style={{ backgroundColor: '#53a91d' }}
                    
                    onClick={(e) => {
                        const values = {
                            date: `${new Date().toJSON().slice(0,10)} `,
                            time,
                            products: cart,
                            sub_total: totalPrice,
                            discount_percent: totalDiscount,
                            tax_percent: totalTax,
                            payment_amount: totalPrice + totalTax - totalDiscount,
                            payment_method: 'visa',
                        }
                        e.preventDefault()
                       if(cart.length === 0 ){
                        setMessage({open: true, message: "Empty List please select product",position:{ vertical: 'top', horizontal: 'right' },severity:'warning'})
                           return
                       }
                       
                        setMessage({open: true, message: `Total amount${(totalPrice + totalTax - totalDiscount).toFixed(3)}$ `,position:{ vertical: 'top', horizontal: 'right' },severity:'success'})
                        onAddCheckout(values)
                        handleCancle()
                    }}
                >
                    Payment
               </Button>
            </Grid>
        </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
        checkouts: state.checkouts.checkouts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddCheckout:(checkout) => dispatch(checkoutsActions.addCheckout(checkout))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductOrders)