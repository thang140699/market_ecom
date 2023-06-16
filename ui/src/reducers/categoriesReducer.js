import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  CLEAR_ERRORS,
  CREATE_CATEGORIES_FAIL,
  CREATE_CATEGORIES_REQUEST,
  CREATE_CATEGORIES_RESET,
  CREATE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_FAIL,
  DELETE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_RESET,
  DELETE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAIL,
  UPDATE_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_RESET,
  UPDATE_CATEGORIES_SUCCESS,
} from "../constants/categoriesConstants";

export const newCategoriesReducer = (state = { categories: {} }, action) => {
  switch (action.type) {
    case CREATE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CATEGORIES_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        categories: action.categories,
      };

    case CREATE_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CATEGORIES_RESET:
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

export const allCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        loading: true,
      };

    case ALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };

    case ALL_CATEGORIES_FAIL:
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

export const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES_REQUEST:
    case DELETE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_CATEGORIES_FAIL:
    case DELETE_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CATEGORIES_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_CATEGORIES_RESET:
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
