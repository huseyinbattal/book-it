import { combineReducers } from "redux";
import { allRoomsReducer,roomDetailsReducer } from "./roomReducers";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails:roomDetailsReducer,
});

export default reducer;
