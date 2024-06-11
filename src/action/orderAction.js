import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (data, navigate) => async (dispatch) => {
  try {
    dispatch({type: types.CREATE_ORDER_REQUEST});
    const res = await api.post('/order', data);
    if(res.status === 200) {
      dispatch({type: types.CREATE_ORDER_SUCCESS, payload: res.data.orderNum});
      dispatch(cartActions.getCartQty());
      navigate('/payment/success');
    } else if(res.status === 400) {
      throw new Error(res.error)
    }
  } catch (error) {
    dispatch({type: types.CREATE_ORDER_FAIL, payload: error.error});
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({type: types.GET_ORDER_REQUEST});
    const res = await api.get('/order');
    if(res.status === 200) {
      dispatch({type: types.GET_ORDER_SUCCESS, payload: res.data.orderList})
    } else if(res.status === 400) {
      throw new Error(res.error)
    }
  } catch (error) {
    dispatch({type: types.GET_ORDER_FAIL, payload: error.error});
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const getOrderDetailInfo = (id) => async (dispatch) => {
    try {
      dispatch({type: types.GET_ORDER_DETAIL_INFO_REQUEST});
      const res = await api.get(`/order/${id}`);
      if(res.status === 200) {
        dispatch({type: types.GET_ORDER_DETAIL_INFO_SUCCESS, payload: res.data.orderDetailInfo});
      } else if(res.status === 400) {
        throw new Error(res.error)
      }
    } catch (error) {
      dispatch({type: types.GET_ORDER_DETAIL_INFO_FAIL, payload: error.error});
      dispatch(commonUiActions.showToastMessage(error.error, 'error'));
    }
}
const getOrderList = (query) => async (dispatch) => {};

const updateOrder = (id, status) => async (dispatch) => {};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderDetailInfo,
  getOrderList,
  updateOrder,
};
