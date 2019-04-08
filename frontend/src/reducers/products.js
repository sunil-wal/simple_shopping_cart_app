import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART, RECEIVE_NEW_PRODUCT, DELETE_PRODUCT } from '../constants/ActionTypes'

const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product._id] = product
          return obj
        }, {})
      }
    case RECEIVE_NEW_PRODUCT:
      const data = {
        [action.productDetails._id] : action.productDetails
      }
      console.log(data);
      return {
        ...state,
        ...data
      }
    default:
      const { productId } = action
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product._id)
    case RECEIVE_NEW_PRODUCT:
      const newState = state;
      newState.push(action.productDetails._id);
      return newState
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds
})

export const getProduct = (state, id) =>
  state.byId[id]

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id))
