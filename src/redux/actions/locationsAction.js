import {ADD_LOCATION} from "../types/loctionsType";
import {GET_LOCATIONS} from "../types/loctionsType";

/*export const UpdateLocation=(lng,lat,zoom) => {
    return {
        type:UPDATE_LOCATION,
        payload:{lng,lat,zoom}
    }
}*/
export const GetLocations =()=>{
    return{
        type:GET_LOCATIONS
    }
}
export const AddLocation =(locationId,locationName,lng,lat)=>{
    return{
        type:ADD_LOCATION,
        payload:{locationId,locationName,lng,lat}
    }
}