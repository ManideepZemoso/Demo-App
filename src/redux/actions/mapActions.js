// import {UPDATE_LAT,UPDATE_LONG,ZOOM} from "./mapType";
import {UPDATE_CORDINATES} from "../types/mapType";
import {UPDATE_MAPSTYLE} from "../types/mapType";

export const UpdateCordinates=(lng,lat,zoom) => {
    return {
        type:UPDATE_CORDINATES,
        payload:{lng,lat,zoom}
    }
}
export const UpdateMapStyle=()=>{
    return{
        type:UPDATE_MAPSTYLE
    }
}


