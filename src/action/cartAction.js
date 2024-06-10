import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
const addToCart =
  ({ id, size }) =>
  async (dispatch) => {
    try {
      dispatch({type: types.ADD_TO_CART_REQUEST});
      const res = await api.post('/cart', { productId: id, size, qty: 1 });
      if(res.status === 200) {
        dispatch({type: types.ADD_TO_CART_SUCCESS, payload: res.data.cartItemQty});
        dispatch(commonUiActions.showToastMessage('카트에 상품이 추가되었습니다.', 'success'));
      } else if(res.status === 400) {
        throw new Error('카트 추가에 실패했습니다.')
      }
    } catch (error) {
      dispatch({type: types.ADD_TO_CART_FAIL, payload: error.error});
      dispatch(commonUiActions.showToastMessage(error.error, 'error'));
    }
  };

const getCartList = () => async (dispatch) => {
  try {
    dispatch({type: types.GET_CART_LIST_REQUEST});
    const res = await api.get('/cart');
    if(res.status === 200) {
      dispatch({type: types.GET_CART_LIST_SUCCESS, payload: res.data.data});
      console.log(res.data.data)
    } else if(res.status === 400) {
      throw new Error('카트 리스트를 불러오지 못했습니다.')
    }
  } catch (error) {
    dispatch({type: types.GET_CART_LIST_FAIL, payload: error.error});
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    const res = await api.delete(`/cart/${id}`);
    if (res.status === 200) {
      dispatch({
        type: types.DELETE_CART_ITEM_SUCCESS,
        payload: res.data.cartItemQty,
      });
      dispatch(getCartList());
    } else if (res.status === 400) {
      throw new Error(res.error);
    }

  } catch (error) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const res = await api.put(`/cart/${id}`, { qty: value });
    if (res.status === 200) {
      dispatch({
        type: types.UPDATE_CART_ITEM_SUCCESS,
        payload: res.data.data,
      });
    } else if (res.status === 400) {
      throw new Error(res.error);
    }
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const getCartQty = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_QTY_REQUEST });
    const res = await api.get("/cart/qty");
    if (res.status === 200) {
      dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: res.data.qty });
    } else if(res.status === 400) {
      throw new Error(res.error); 
    }
  } catch (error) {
    dispatch({ type: types.GET_CART_QTY_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
