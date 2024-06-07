import * as types from "../constants/product.constants";
const initialState = {
  loading: false,
  error: '',
  productList: [],
  totalPage: 1,
  selectedProduct: null
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case types.PRODUCT_CREATE_REQUEST:
    case types.PRODUCT_GET_REQUEST:
    case types.PRODUCT_EDIT_REQUEST:
    // case types.PRODUCT_DELETE_REQUEST:
      return {...state, loading: true}

    case types.PRODUCT_CREATE_SUCCESS:
    case types.PRODUCT_EDIT_SUCCESS:
    // case types.PRODUCT_DELETE_SUCCESS:
      return {...state, loading: false, error: ''}

    case types.PRODUCT_GET_SUCCESS:
      return {...state, loading: false, productList:payload.data, totalPage:payload.totalPage}

    case types.PRODUCT_CREATE_FAIL:
    case types.PRODUCT_GET_FAIL:
    case types.PRODUCT_EDIT_FAIL:
    // case types.PRODUCT_DELETE_FAIL:
      return {...state, loading: false, error:payload}

    case types.SET_SELECTED_PRODUCT:
      return {...state, selectedProduct:payload}
      
    default:
      return state;
  }
}

export default productReducer;
