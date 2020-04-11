import {createStore,applyMiddleware,compose} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from "./reducers/rootReducer";
import mapReducer from "./reducers/mapReducer";
import locationReducer from "./reducers/LocationReducer";
import GetLocationData from "../components/LocationComponents/LocationCordinates";

const intialState={
    lng: 78.486671,
    lat: 17.385044,
    zoom: 4,
    locations:GetLocationData
}

function configureStore(initialState) {
    const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        mapReducer,
        intialState,
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
    );
}

const store=configureStore(intialState);
export default store;


