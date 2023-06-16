import {
  ADMIN_COUPON_FAIL,
  CLEAR_ERRORS,
  ADMIN_COUPON_REQUEST,
  ADMIN_COUPON_SUCCESS,
  ALL_COUPON_FAIL,
  ALL_COUPON_REQUEST,
  ALL_COUPON_SUCCESS,
  DELETE_COUPON_REQUEST,
  UPDATE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  UPDATE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
  UPDATE_COUPON_FAIL,
  DELETE_COUPON_RESET,
  UPDATE_COUPON_RESET,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_DETAILS_FAIL,
  NEW_COUPON_REQUEST,
  NEW_COUPON_SUCCESS,
  NEW_COUPON_FAIL,
  NEW_COUPON_RESET,
} from "../constants/couponConstants";

export const couponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case ALL_COUPON_REQUEST:
    case ADMIN_COUPON_REQUEST:
      return {
        loading: true,
        coupons: [],
      };
    case ALL_COUPON_SUCCESS:
      return {
        loading: false,
        coupons: action.payload.coupons,
        // couponsCount: action.payload.couponsCount,
        // resultPerPage: action.payload.resultPerPage,
        // filteredCouponsCount: action.payload.filteredCouponsCount,
      };

    case ADMIN_COUPON_SUCCESS:
      return {
        loading: false,
        coupons: action.payload,
      };
    case ALL_COUPON_FAIL:
    case ADMIN_COUPON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newCouponReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case NEW_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_COUPON_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        coupon: action.payload.coupon,
      };
    case NEW_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_COUPON_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COUPON_REQUEST:
    case UPDATE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_COUPON_FAIL:
    case UPDATE_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_COUPON_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_COUPON_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const couponDetailsReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case COUPON_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case COUPON_DETAILS_SUCCESS:
      return {
        loading: false,
        coupon: action.payload,
      };
    case COUPON_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
