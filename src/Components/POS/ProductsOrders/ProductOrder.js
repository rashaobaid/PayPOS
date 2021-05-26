import React from 'react'
import {Paper,Grid,makeStyles,createStyles,IconButton} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            width: "100%",
            height: "5em",
        },
        productOrder: {
            width: "100%",
            height: "75%",
            
        },
        productOrderPaper: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: '#a3a3a3',
            paddingRight:'6px'
        },
        cancelIcon: {
            color: "red",
            opacity: "0.5",
            "&:hover": {
                opacity: "1",
            },
        },
        iconButton: {
            backgroundColor: "#aabdca",
            padding: "0.2px",
            borderRadius: "0.2em",
            color: '#ffffff',
            margin: '3px',
            "&:hover": {
                backgroundColor: "#5d6d78",
            },
        },
        productQuantity: {
            display: "flex",
            alignItems: "center",
        },
    })
);
const ProductOrder = ({product,removeItem,updateCartQuntity}) => {
    const classes = useStyles();
 
    return (
        <Grid container className={classes.container} >
            <Grid className={classes.productOrder} item >
                <Paper className={classes.productOrderPaper}>
                    <Grid item>
                        <IconButton onClick={()=>removeItem(product.Id)} >
                            <CancelIcon className={classes.cancelIcon} />
                        </IconButton>
                        {product.name}
                    </Grid>
                    <Grid item >{product.price}$</Grid>
                    <Grid item className={classes.productQuantity}>
                        <IconButton className={classes.iconButton} onClick={()=>updateCartQuntity(product.Id,product.quantity-1)}>
                            <RemoveIcon />
                        </IconButton>
                            {product.quantity}
                           <IconButton className={classes.iconButton} onClick={()=>updateCartQuntity(product.Id,product.quantity + 1)} >
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    <Grid item >{product.quantity * product.price}$</Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ProductOrder;