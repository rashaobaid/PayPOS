import React from 'react'
import ProductModal  from '../Components/ProductTable/ProductModal ';
import  SearchBar from '../Components/SearchBar/SearchBar';
import ProductTable from '../Components/ProductTable/ProductTable'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as productsActions from "../store/actions/products";
const useStyles =  makeStyles((theme) => ({
    container:{
        display:'flex',
        justifyContent: 'space-around',
        paddingTop: theme.spacing(8),  
        paddingBottom: theme.spacing(3),   
        alignItems: 'flex-end' 
    }
    
}));
 const ProductsPage = ({calculcateFilterdItems,clearFilterText}) => {
    const classes = useStyles();
    return (
        <>
           < span className={classes.container}>
                <ProductModal /> 
                <SearchBar onChangeTextFilter={calculcateFilterdItems} onClearFilterText={clearFilterText} />
            </span>
           <ProductTable />
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        calculcateFilterdItems:(filterText)=> dispatch(productsActions.calculcateFilterdItems(filterText)),
        clearFilterText:(filterText)=> dispatch(productsActions.handleclearFilterText(filterText)),
    };
  };
  export default connect( null, mapDispatchToProps)( ProductsPage)
