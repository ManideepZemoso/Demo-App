import {UPDATE_LOCATION} from "../types/loctionsType";
import {GET_LOCATIONS} from "../types/loctionsType";

/*export const UpdateLocation=(lng,lat,zoom) => {
    return {
        type:UPDATE_LOCATION,
        payload:{lng,lat,zoom}
    }
}*/
export const GetLocations =(zoom)=>{
    return{
        type:GET_LOCATIONS,
        payload:{zoom}
    }
}