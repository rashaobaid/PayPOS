import React,{ useEffect} from 'react'
import { connect } from "react-redux";
import * as productsActions from "../../store/actions/products";
import ECTable from '../UtilsComponents/ECTable';
import  ProductModal from './ProductModal ';
export const ProductTable = ({products,onInitProducts,onDeleteProduct}) => {
    useEffect(() => {
        onInitProducts();
    }, []);
    
    return (
        <ECTable
            headers={['Code', 'Name', 'categoryName','ProductDescription','tx(%)','Price','Action']}
            rowKeys={['code', 'name','categoryName','description','stockCount','price']}
            tableRows={products}
            onDeleteCallback={onDeleteProduct}
            editComponent={(row_props) => <ProductModal {...row_props}/>}
        />
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onInitProducts: () => dispatch(productsActions.fetchProducts()),
        onDeleteProduct:(id)=> dispatch(productsActions.deleteProductById(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
