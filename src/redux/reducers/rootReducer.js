import {combineReducers} from "redux";
import mapReducer from "./mapReducer";
import locationReducer from "./LocationReducer";

const rootReducer= combineReducers({
    mapReducer,
    locationReducer
});

export default rootReducer;