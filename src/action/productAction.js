import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({type:types.PRODUCT_GET_REQUEST});
    const res = await api.get('/product');
    dispatch({type:types.PRODUCT_GET_SUCCESS, payload: res.data.data});
    console.log('product data', res)
  } catch (error) {
    dispatch({type:types.PRODUCT_GET_FAIL, payload: error.error});
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const getProductDetail = (id) => async (dispatch) => {};

const createProduct = (formData) => async (dispatch) => {
  console.log(formData)
  try {
    dispatch({type:types.PRODUCT_CREATE_REQUEST});
    const res = await api.post('/product', formData);
    console.log('createProduct', res)
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
