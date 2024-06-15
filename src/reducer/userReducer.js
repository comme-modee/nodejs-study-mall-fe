import * as types from "../constants/user.constants";
const initialState = {
  loading: false,
  user: null,
  error: ''
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.TOKEN_LOGIN_REQUEST:
    case types.GOOGLE_LOGIN_REQUEST:
    case types.USE_COUPON_REQUEST:
    case types.ADD_USER_COUPONS_REQUEST:
    case types.USE_REWARD_REQUEST:
      return {...state, loading: true}
    case types.LOGIN_SUCCESS:
    case types.GOOGLE_LOGIN_SUCCESS:
    case types.TOKEN_LOGIN_SUCCESS:
      return {...state, loading: false, user:payload.user}
    case types.REGISTER_USER_SUCCESS:
      return {...state, loading: false}
    case types.LOGIN_FAIL:
    case types.REGISTER_USER_FAIL:
    case types.GOOGLE_LOGIN_FAIL:
      return {...state, loading: false, error: payload};
    case types.TOKEN_LOGIN_FAIL:
    case types.USE_COUPON_FAIL:
    case types.ADD_USER_COUPONS_FAIL:
    case types.USE_REWARD_FAIL:
      return {...state, loading: false};
    case types.LOGOUT:
      return {...state, user: null}
    case types.CLEAR_ERROR:
      return {...state, error: ''}
    case types.USE_COUPON_SUCCESS:
    case types.USE_REWARD_SUCCESS:
    case types.ADD_USER_COUPONS_SUCCESS:
    case types.SET_REWARD:
      return {...state, loading: false, user: payload}
    default:
      return state;
  }
}

export default userReducer;