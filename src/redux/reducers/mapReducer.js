/*import {UPDATE_LAT,UPDATE_LONG,ZOOM} from "./mapType";*/
import  {UPDATE_CORDINATES} from "../types/mapType";
import * as map from "mapbox-gl";
import GetLocationData from '../../components/LocationComponents/LocationCordinates';

const mapReducer =(state= [] ,action) => {
    console.log(state)
    switch(action.type){
        case UPDATE_CORDINATES: return {
            ...state,
            lat:action.payload.lat,
            lng:action.payload.lng,
            zoom:action.payload.zoom
        };
    /*    case UPDATE_LONG: return {
            ...state,
            log:map.getCenter().log.toFixed(4)
        }
        case ZOOM: return {
            ...state,
            zoom:map.getZoom().toFixed(2)
        }*/
        default :return state;

    }
}

export default mapReducer;
