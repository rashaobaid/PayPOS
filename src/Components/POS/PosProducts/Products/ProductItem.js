import React from 'react';
import cheesecake from '../../../../image/cheesecake.jpg'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './ProductItem.scss'

const  ProductItem=({product, addToCart})=> {
 
  return (
    <div className="box-wrapper">
        <img src={product.image ? `http://localhost:3001/${product.image}` :cheesecake}/>
        <div className="box-content">
            <a className="buy" onClick={(e) => {
              e.preventDefault();
              addToCart(product)
            }}><span><AddShoppingCartIcon /></span></a>
            <div className="title">{product.name}</div>
            <div className="desc">{product.description}</div>
            <span className="price">{product.price} $</span>
        </div>
        <div className="success"></div>
    </div>
  );
}

export default  ProductItem