import * as types from "../constants/cart.constants";
import {
  LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/user.constants";

const initialState = {
  loading: false,
  error: '',
  cartItemQty: 0,
  cartList: []
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
      return {...state, loading: true}
    case types.ADD_TO_CART_SUCCESS:
      return {...state, cartItemQty: payload}
    case types.GET_CART_LIST_SUCCESS:
      return {...state, cartList: payload}
    case types.ADD_TO_CART_FAIL:
    case types.GET_CART_LIST_FAIL:
      return {...state, loading:false, error: payload}

    default:
      return state;
  }
}
export default cartReducer;
