import { combineReducers } from "redux";
import { allRoomsReducer } from "./roomReducers";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
});

export default reducer;
