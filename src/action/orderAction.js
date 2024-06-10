import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (data) => async (dispatch) => {
  try {
    dispatch({type: types.CREATE_ORDER_REQUEST});
    const res = await api.post('/order', data);
    if(res.status === 200) {
      dispatch({type: types.CREATE_ORDER_SUCCESS, payload: ''})
    } else if(res.status === 400) {
      throw new Error(res.error)
    }
  } catch (error) {
    dispatch({type: types.CREATE_ORDER_FAIL, payload: error.error})
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const getOrder = () => async (dispatch) => {};
const getOrderList = (query) => async (dispatch) => {};

const updateOrder = (id, status) => async (dispatch) => {};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
