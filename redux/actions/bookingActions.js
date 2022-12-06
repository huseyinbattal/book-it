import axios from "axios";

import {
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    CHECK_BOOKING_RESET,
    CHECK_BOOKING_FAIL,
    CLEAR_ERRORS,
  } from "../constants/bookingConstants";

export const checkBooking = (roomId,checkInDate,checkOutDate) => async (dispatch) => {
  try {
      dispatch({ type: CHECK_BOOKING_REQUEST });
      
      let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
      
    const { data } = await axios.get(link);

    dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload:data.isAvailable
    });
      
  } catch (error) {
    dispatch({
      type: CHECK_BOOKING_FAIL,
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