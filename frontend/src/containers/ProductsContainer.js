import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart, addNewProduct, deleteProduct } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'
import AddProduct from '../components/AddProduct'

const ProductsContainer = ({ products, addToCart, addNewProduct, deleteProduct }) => (
  <ProductsList title="Products">
    {products.map(product =>
      <ProductItem
        key={product._id}
        product={product}
        onAddToCartClicked={() => addToCart(product._id)} 
        onDeleteClicked={() => deleteProduct(product._id)} 
        />
    )}
  </ProductsList>
)

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  { addToCart, addNewProduct, deleteProduct }
)(ProductsContainer)
