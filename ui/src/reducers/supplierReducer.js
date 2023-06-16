import {
  ALL_SUPPLIERS_FAIL,
  ALL_SUPPLIERS_REQUEST,
  ALL_SUPPLIERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_SUPPLIER_FAIL,
  CREATE_SUPPLIER_REQUEST,
  CREATE_SUPPLIER_RESET,
  CREATE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAIL,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_RESET,
  DELETE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_FAIL,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_RESET,
  UPDATE_SUPPLIER_SUCCESS,
} from "../constants/supplierConstants";

export const newSupplierReducer = (state = { supplier: {} }, action) => {
  switch (action.type) {
    case CREATE_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SUPPLIER_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        supplier: action.supplier,
      };

    case CREATE_SUPPLIER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_SUPPLIER_RESET:
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

export const allSupplierReducer = (state = { supplier: [] }, action) => {
  switch (action.type) {
    case ALL_SUPPLIERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_SUPPLIERS_SUCCESS:
      return {
        loading: false,
        supplier: action.payload,
      };

    case ALL_SUPPLIERS_FAIL:
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

export const supplierReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SUPPLIER_REQUEST:
    case DELETE_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_SUPPLIER_FAIL:
    case DELETE_SUPPLIER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_SUPPLIER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_SUPPLIER_RESET:
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
