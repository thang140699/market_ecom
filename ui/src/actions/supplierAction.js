import axios from "axios";
import {
  ALL_SUPPLIERS_FAIL,
  ALL_SUPPLIERS_REQUEST,
  ALL_SUPPLIERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_SUPPLIER_FAIL,
  CREATE_SUPPLIER_REQUEST,
  CREATE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAIL,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_FAIL,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_SUCCESS,
} from "../constants/supplierConstants";

// Create Order
export const createSupplier = (supplier) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUPPLIER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/supplier/create",
      supplier,
      config
    );

    dispatch({
      type: CREATE_SUPPLIER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SUPPLIER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Suppliers (admin)
export const getSupplier = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SUPPLIERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/supplier");

    dispatch({ type: ALL_SUPPLIERS_SUCCESS, payload: data.supplier });
  } catch (error) {
    dispatch({
      type: ALL_SUPPLIERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateSupplier = (id, supplier) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SUPPLIER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/supplier/${id}`,
      supplier,
      config
    );

    dispatch({ type: UPDATE_SUPPLIER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_SUPPLIER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteSupplier = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUPPLIER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/supplier/${id}`);

    dispatch({ type: DELETE_SUPPLIER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_SUPPLIER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
