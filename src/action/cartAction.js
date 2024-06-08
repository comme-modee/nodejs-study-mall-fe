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

const getCartList = () => async (dispatch) => {};
const deleteCartItem = (id) => async (dispatch) => {};

const updateQty = (id, value) => async (dispatch) => {};
const getCartQty = () => async (dispatch) => {};
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
