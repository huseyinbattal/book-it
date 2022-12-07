import axios from "axios";

import {
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    CHECK_BOOKING_RESET,
    CHECK_BOOKING_FAIL,
    BOOKED_DATES_SUCCESS,
    BOOKED_DATES_FAIL,
    MY_BOOKINGS_SUCCESS,
    MY_BOOKINGS_FAIL,
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

export const getBookedDates = (id) => async (dispatch) => {
  try {

    const { data } = await axios.get(`/api/bookings/check_booked_dates?roomId=${id}`);

    dispatch({
        type: BOOKED_DATES_SUCCESS,
        payload:data.bookedDates,
    });
      
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const myBookings = () => async (dispatch) => {
  try {

    const { data } = await axios.get(`/api/bookings/me`);

    dispatch({
        type: MY_BOOKINGS_SUCCESS,
        payload:data.bookings,
    });
      
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAIL,
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