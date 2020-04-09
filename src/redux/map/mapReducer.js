/*import {UPDATE_LAT,UPDATE_LONG,ZOOM} from "./mapType";*/
import  {UPDATE_CORDINATES} from "./mapType";
import * as map from "mapbox-gl";

const intialState={
    lng: 78.486671,
    lat: 17.385044,
    zoom: 4
}
const mapReducer =(state= intialState ,action) => {
    switch(action.type){

        case UPDATE_CORDINATES: return {
            lat:action.payload.lat,
            lng:action.payload.lng,
            zoom:action.payload.zoom
        }
    /*    case UPDATE_LONG: return {
            ...state,
            log:map.getCenter().log.toFixed(4)
        }
        case ZOOM: return {
            ...state,
            zoom:map.getZoom().toFixed(2)
        }*/
        default :return state

    }
}

export default mapReducer;
