import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESS,
  REVIEW_AVAILABILITY_FAIL,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ADMIN_ROOMS_FAIL,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  CLEAR_ERRORS,
} from "../constants/roomConstants";

// Get all rooms
export const getRooms =
  (req, currentPage = 1, location = "", guests, category) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);

      let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;

      if (guests) link = link.concat(`&guestCapacity=${guests}`);
      if (category) link = link.concat(`&category=${category}`);

      const { data } = await axios.get(link);
      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get room details
export const getRoomDetails = (req, id) => async (dispatch) => {
  try {

    const { origin } = absoluteUrl(req);

    let url;

    if (req) {
      url=`${origin}/api/rooms/${id}`
    } else {
      url=`/api/rooms/${id}`
    }

    const { data } = await axios.get(url);

    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get  all rooms - ADMIN
export const getAdminRooms = () => async (dispatch) => {
  try {
    dispatch({ type:ADMIN_ROOMS_REQUEST });

    const { data } = await axios.get(`/api/admin/rooms`);

    dispatch({
      type: ADMIN_ROOMS_SUCCESS,
      payload: data.rooms,
    });
    
  } catch (error) {
    dispatch({
      type: ADMIN_ROOMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newRoom = (id,roomData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROOM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/rooms`, roomData, config);

    dispatch({
      type: NEW_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateRoom = (id,roomData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROOM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/rooms/${id}`, roomData, config);

    dispatch({
      type: UPDATE_ROOM_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    console.log("ERROR===>",error)
    dispatch({
      type: UPDATE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteRoom = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROOM_REQUEST });

    const { data } = await axios.delete(`/api/rooms/${id}`);

    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/reviews`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const checkReviewAvailability = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_AVAILABILITY_REQUEST });

    const { data } = await axios.get(
      `/api/reviews/check_review_availability?roomId=${roomId}`
    );

    dispatch({
      type: REVIEW_AVAILABILITY_SUCCESS,
      payload: data.isReviewAvailable,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_AVAILABILITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
