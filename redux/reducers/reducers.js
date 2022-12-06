import { combineReducers } from "redux";
import { checkBookingReducer } from "./bookingReducers";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  loadedUserReducer
} from "./userReducers";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  loadedUser: loadedUserReducer,
  checkBooking:checkBookingReducer,
});

export default reducer;
