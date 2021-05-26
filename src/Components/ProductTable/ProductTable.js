import React,{ useEffect} from 'react'
import { connect } from "react-redux";
import * as productsActions from "../../store/actions/products";
import ECTable from '../UtilsComponents/ECTable';
import  ProductModal from './ProductModal ';
import userStyles from "./style";
export const ProductTable = ({products,onInitProducts,onDeleteProduct,flltered_data,filter_text}) => {
    const classes = userStyles();
    const tableRows = React.useMemo(()=> filter_text === '' ? products : flltered_data, [products, filter_text])

    useEffect(() => {
        onInitProducts();
    }, []);
    
    return (
        <ECTable
            headers={['Code', 'Name', 'categoryName','ProductDescription','tx(%)','Price','Action']}
            rowKeys={['code', 'name','categoryName','description','stockCount','price']}
            tableRows={tableRows}
            onDeleteCallback={onDeleteProduct}
            editComponent={(row_props) => <ProductModal {...row_props}/>}
            customStyle={classes}
        />
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        flltered_data: state.products.flltered_data,
        filter_text: state.products.filter_text
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onInitProducts: () => dispatch(productsActions.fetchProducts()),
        onDeleteProduct:(id)=> dispatch(productsActions.deleteProductById(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
