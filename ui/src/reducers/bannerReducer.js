import {
  ALL_BANNERS_FAIL,
  ALL_BANNERS_REQUEST,
  ALL_BANNERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_BANNER_FAIL,
  CREATE_BANNER_REQUEST,
  CREATE_BANNER_RESET,
  CREATE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_RESET,
  DELETE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_RESET,
  UPDATE_BANNER_SUCCESS,
} from "../constants/bannerConstants";

export const newBannerReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case CREATE_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BANNER_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        banner: action.banner,
      };

    case CREATE_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_BANNER_RESET:
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

export const allBannerReducer = (state = { banner: [] }, action) => {
  switch (action.type) {
    case ALL_BANNERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_BANNERS_SUCCESS:
      return {
        loading: false,
        banner: action.payload,
      };

    case ALL_BANNERS_FAIL:
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

export const bannerReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BANNER_REQUEST:
    case DELETE_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_BANNER_FAIL:
    case DELETE_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_BANNER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_BANNER_RESET:
      return {
        ...state,
        isDeleted: false,
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
