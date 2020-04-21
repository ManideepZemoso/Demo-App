import {combineReducers} from "redux";
import mapReducer from "./mapReducer";
import locationReducer from "./LocationReducer";

const rootReducer= combineReducers({
    map:mapReducer,
    location:locationReducer
});

export default rootReducer;