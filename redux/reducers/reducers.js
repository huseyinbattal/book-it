import { combineReducers } from "redux";
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
  loadedUser:loadedUserReducer,
});

export default reducer;
