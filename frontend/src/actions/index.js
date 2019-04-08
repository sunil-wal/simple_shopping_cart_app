import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import axios from 'axios'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})
const receiveNewProduct = productDetails => ({
  type: types.RECEIVE_NEW_PRODUCT,
  productDetails
})

export const getAllProducts = () => dispatch => {
  // shop.getProducts(products => {
  //   dispatch(receiveProducts(products))
  // });
  axios
    .get("http://localhost:8080/products")
    .then(products => {
      console.log(products);
      dispatch(receiveProducts(products.data))
    })
    .catch(error => {
      dispatch(receiveProducts(error.message))
    })
}

export const addNewProduct = newProductData => dispatch => {
  console.log(newProductData);
  axios
    .post("http://localhost:8080/products/create", newProductData)
    .then(products => {
      console.log(products);
      dispatch(receiveNewProduct(products.data))
    })
    .catch(error => {
      dispatch(receiveNewProduct(error.message))
    })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})
const deleteItem = productId => ({
  type: types.DELETE_PRODUCT,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  const inventory = getState().products.byId[productId].inventory;
  if (inventory > 0) {
    axios
    .put(`http://localhost:8080/products/${productId}/update`, {inventory: inventory-1})
    .then(products => {
      console.log(products);
      dispatch(addToCartUnsafe(productId))
    })
    .catch(error => {
      dispatch(addToCartUnsafe(error.message))
    })
  }
}

export const deleteProduct = productId => (dispatch, getState) => {
  const inventory = getState().products.byId[productId].inventory;
  if (inventory > 0) {
    axios
    .delete(`http://localhost:8080/products/${productId}/delete`)
    .then(products => {
      console.log(products);
      dispatch(deleteItem(productId))
    })
    .catch(error => {
      dispatch(deleteItem(error.message))
    })
  }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
