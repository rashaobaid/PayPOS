import React, { useState, useMemo, useEffect } from 'react'
import { Grid } from "@material-ui/core";
import ProductItem from "./ProductItem";
import CategoriesTab from '../CategoriesTab';
import ProductsSearchBar from '../ProductsSearchBar';
import { connect } from "react-redux";
import * as productsActions from "../../../../store/actions/products";
const ProductsPanel = ({ products, onInitProducts, addToCart }) => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filterText, setFilterText] = useState("");
    const categoriesName = useMemo(() => [...new Set(Object.entries(products).map(([key, product]) => product.categoryName))], [products])

    useEffect(() => {
        onInitProducts();
    }, [])


    const filterByCategoryName = (categoryName) => {
        if (categoryName === 'all') {
            setFilteredProducts(products)
        }
        else {
            let filtered_Products = Object.fromEntries(Object.entries(products).filter(([key, product]) =>
                categoryName === product.categoryName))
            setFilteredProducts(filtered_Products)
        }
    }

    const calculcateFilterdItems = (products, filterText) => {
        let filtered_items = {};
        Object.entries(products).map(([key, product]) => {
            if ((product.name).toLowerCase().includes(filterText) ||
                (product.description).toLowerCase().includes(filterText) ||
                (product.price) === (filterText))
                filtered_items[key] = product
        })
        return filtered_items
    };

    const ProductItems = useMemo(() => filterText === '' ? filteredProducts : calculcateFilterdItems(filteredProducts, filterText), [filteredProducts, filterText])

    const handleclearFilterText = () => {
        setFilterText("");
    };

    return (
        <>
            <CategoriesTab categoriesName={categoriesName} handleFilterByCategoryName={filterByCategoryName} />
            <ProductsSearchBar
                handleclearFilterText={handleclearFilterText}
                onSearchTextChanged={setFilterText} // pass function for filter !
                filterText={filterText}
            />
            <Grid container>
                {
                    Object.entries(ProductItems).map(([key, product]) => {
                        return <ProductItem key={`tab_${key}`} product={product} addToCart={addToCart} />
                    })
                }
            </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onInitProducts: () => dispatch(productsActions.fetchProducts())

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsPanel)
