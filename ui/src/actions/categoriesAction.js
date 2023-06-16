import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  CLEAR_ERRORS,
  CREATE_CATEGORIES_FAIL,
  CREATE_CATEGORIES_REQUEST,
  CREATE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_FAIL,
  DELETE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAIL,
  UPDATE_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_SUCCESS,
} from "../constants/categoriesConstants";
import axios from "axios";
export const createCategories = (categories) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORIES_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/categories/create",
      categories,
      config
    );

    dispatch({
      type: CREATE_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All categoriess (admin)
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });

    const { data } = await axios.get("/api/v1/admin/categories");

    dispatch({ type: ALL_CATEGORIES_SUCCESS, payload: data.categories });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateCategories = (id, categories) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORIES_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/categories/${id}`,
      categories,
      config
    );

    dispatch({ type: UPDATE_CATEGORIES_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteCategories = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORIES_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/categories/${id}`);

    dispatch({ type: DELETE_CATEGORIES_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
