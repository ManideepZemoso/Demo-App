// import {UPDATE_LAT,UPDATE_LONG,ZOOM} from "./mapType";
import {UPDATE_CORDINATES} from "../types/mapType";

/*export const updateLat = () => {
    return {
        type:UPDATE_LAT
    }
}
export const updateLONG = () => {
    return {
        type:UPDATE_LONG
}
}
export const zoom = () => {
    return {
        type:ZOOM
    }
}*/
export const UpdateCordinates=(lng,lat,zoom) => {
    return {
        type:UPDATE_CORDINATES,
        payload:{lng,lat,zoom}
    }
}


