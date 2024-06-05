import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({type:types.PRODUCT_GET_REQUEST});
    const res = await api.get('/product');
    if(res !== 200) throw new Error(res.error);
    console.log('product data', res)
    dispatch({type:types.PRODUCT_GET_SUCCESS, payload: res.data.data});
  } catch (error) {
    dispatch({type:types.PRODUCT_GET_REQUEST, payload: error.error});
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
