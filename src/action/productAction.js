import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  console.log('get product in', query)
  try {
    dispatch({type:types.PRODUCT_GET_REQUEST});
    const res = await api.get('/product', {
      params: {...query}
    });
    if(res.status === 200) {
      dispatch({type:types.PRODUCT_GET_SUCCESS, payload: res.data});
      console.log('product data', res.data.data)
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
  console.log(formData)
  try {
    dispatch({type:types.PRODUCT_CREATE_REQUEST});
    const res = await api.post('/product', formData);
    console.log('createProduct', res)
    if(res !== 200) throw new Error(res.error);
    dispatch({type:types.PRODUCT_CREATE_SUCCESS});
    dispatch(productActions.getProductList());
    dispatch(commonUiActions.showToastMessage('상품 생성 완료', 'success'));
  } catch (error) {
    dispatch({type:types.PRODUCT_CREATE_FAIL, payload: error.error});
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};
const deleteProduct = (id) => async (dispatch) => {};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({type: types.PRODUCT_EDIT_REQUEST})
    const res = await api.put(`/product/${id}`, formData);
    if(res !== 200) throw new Error(res.error);
    dispatch({type: types.PRODUCT_EDIT_SUCCESS});
    dispatch(productActions.getProductList());
    dispatch(commonUiActions.showToastMessage('상품 수정 완료', 'success'));
  } catch (error) {
    dispatch({type:types.PRODUCT_EDIT_FAIL, payload: error.error});
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
