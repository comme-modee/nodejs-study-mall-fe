import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({type: types.TOKEN_LOGIN_REQUEST})
    const res = await api.get('/user/me');
    if(res.status !== 200) throw new Error('Invalid token');
    dispatch({type: types.TOKEN_LOGIN_SUCCESS, payload: res.data})
  } catch (error) {
    dispatch({type: types.TOKEN_LOGIN_FAIL, payload: error.error})
    dispatch(logout())
  }
};

const loginWithEmail = 
  ({ email, password }, navigate) => 
    async (dispatch) => {
      try {
        dispatch({type: types.LOGIN_REQUEST})
        const res = await api.post('/user/login', {email, password})
        if(res.status !== 200) throw new Error(res.error)
        dispatch({type: types.LOGIN_SUCCESS, payload: res.data})
        sessionStorage.setItem('token', res.data.token)
        dispatch(commonUiActions.showToastMessage("로그인을 완료했습니다.", "success"))
      } catch (error) {
        dispatch({type: types.LOGIN_FAIL, payload: error.error})
      }
  };

const logout = () => async (dispatch) => {
  dispatch({type: types.LOGOUT});
  sessionStorage.removeItem('token');
};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
      try {
        dispatch({type: types.REGISTER_USER_REQUEST})
        const res = await api.post('/user', {email, name, password})
        if(res.status !== 200) throw new Error(res.error)
        dispatch({type: types.REGISTER_USER_SUCCESS})
        dispatch(commonUiActions.showToastMessage("회원가입을 완료했습니다.", "success"))
        navigate('/login')
      } catch (error) {
        dispatch({type: types.REGISTER_USER_FAIL, payload: error.error})
      }
  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
