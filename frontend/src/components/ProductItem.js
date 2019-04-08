import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import { Button } from "react-bootstrap";

const ProductItem = ({ product, onAddToCartClicked, onDeleteClicked }) => (
  <div style={{ marginBottom: 20 }}>
    <Product
      title={product.title}
      price={product.price}
      quantity={product.inventory} />
    <Button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? false : true}>
      {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
    </Button>
    {/* <button
      onClick={onDeleteClicked}>
      Delete
    </button> */}
  </div>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
