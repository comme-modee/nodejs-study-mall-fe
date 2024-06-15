import * as types from "../constants/order.constants";

const initialState = {
  loading: false,
  error: '',
  orderNum: null,
  orderList: [],
  orderDetailInfo: null,
  adminOrderList: [],
  totalPage: 0,
  selectedOrder: null,
  selectedCoupon: null,
  usedReward: null
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_DETAIL_INFO_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
      return {...state, loading: true}
      
    case types.CREATE_ORDER_SUCCESS:
      return {...state, loading: false, orderNum: payload}
    case types.GET_ORDER_SUCCESS:
      return {...state, loading: false, orderList: payload}
    case types.GET_ORDER_DETAIL_INFO_SUCCESS:
      return {...state, loading: false, orderDetailInfo: payload}
    case types.GET_ORDER_LIST_SUCCESS:
      return {...state, loading: false, adminOrderList: payload.data, totalPage: payload.totalPage}

    case types.SET_SELECTED_ORDER:
      return {...state, selectedOrder: payload}

    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_DETAIL_INFO_FAIL:
    case types.GET_ORDER_LIST_FAIL:
      return {...state, loading: false, error: payload}

    case types.SET_SELECTED_COUPON:
      return { ...state, selectedCoupon: payload }
    case types.SET_USE_REWARD:
      return { ...state, usedReward: payload }

    default:
      return state;
  }
}
export default orderReducer;
