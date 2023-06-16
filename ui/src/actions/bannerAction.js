import axios from "axios";
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

export const createBanner = (banner) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BANNER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/banner/create",
      banner,
      config
    );

    dispatch({
      type: CREATE_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All BANNERs (admin)
export const getBanner = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BANNERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/banner");

    dispatch({ type: ALL_BANNERS_SUCCESS, payload: data.banner });
  } catch (error) {
    dispatch({
      type: ALL_BANNERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateBanner = (id, banner) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BANNER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/banner/${id}`,
      banner,
      config
    );

    dispatch({ type: UPDATE_BANNER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteBanner = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BANNER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/banner/${id}`);

    dispatch({ type: DELETE_BANNER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
