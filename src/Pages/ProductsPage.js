import React from 'react'
import ProductModal  from '../Components/ProductTable/ProductModal ';
import  SearchBar from '../Components/SearchBar/SearchBar';
import ProductTable from '../Components/ProductTable/ProductTable'
import { makeStyles } from '@material-ui/core/styles';

const useStyles =  makeStyles((theme) => ({
    container:{
        display:'flex',
        justifyContent: 'space-around',
        paddingTop: theme.spacing(8),  
        paddingBottom: theme.spacing(3),    
    }
    
}));
 const ProductsPage = () => {
    const classes = useStyles();
    return (
        <>
           <ProductModal /> 
           <ProductTable />
        </>
    )
}
export default ProductsPage;

