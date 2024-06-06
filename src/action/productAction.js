import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({type:types.PRODUCT_GET_REQUEST});
    const res = await api.get('/product', {
      params: {...query}
    });
    if(res.status === 200) {
      dispatch({type:types.PRODUCT_GET_SUCCESS, payload: res.data});
    } else if (res.status === 400) {
      throw new Error('there is no data')
    }
    
  } catch (error) {
    dispatch({type:types.PRODUCT_GET_FAIL, payload: error.error});
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const getProductDetail = (id) => async (dispatch) => {};

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({type:types.PRODUCT_CREATE_REQUEST});
    const res = await api.post('/product', formData);
    if(res !== 200) throw new Error(res.error);
    dispatch({type:types.PRODUCT_CREATE_SUCCESS});
    dispatch({type:types.PRODUCT_GET_SUCCESS, payload: res.data});
    dispatch(commonUiActions.showToastMessage('상품 생성 완료', 'success'));
  } catch (error) {
    dispatch({type:types.PRODUCT_CREATE_FAIL, payload: error.error});
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};
const deleteProduct = (id) => async (dispatch) => {};

const editProduct = (formData, id) => async (dispatch) => {};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
