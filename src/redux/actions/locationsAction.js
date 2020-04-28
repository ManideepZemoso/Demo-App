import {ADD_LOCATION} from "../types/loctionsType";
import {GET_LOCATIONS} from "../types/loctionsType";
import  {SORT} from "../types/loctionsType";
import axios from 'axios';
import {convertServiceTolocationPayload} from "../../Converters/locationConvertor";
/*export const UpdateLocation=(lng,lat,zoom) => {
    return {
        type:UPDATE_LOCATION,
        payload:{lng,lat,zoom}
    }
}*/
export const GetLocations =(locations)=>{
    return{
        type:GET_LOCATIONS,
        payload: convertServiceTolocationPayload(locations)
    }
}
export const AddLocation =(locationId,locationName,lng,lat)=>{
    return{
        type:ADD_LOCATION,
        payload:{locationId,locationName,lng,lat}
    }
}
export const updateSort=()=>{
    return{
        type:SORT
    }
}
export const fetchLocations =()=>{
    return (dispatch) =>{
        axios.get('https://5e9fdb2f11b078001679ceca.mockapi.io/api/locations')
         .then(response=>{
             const locations=response.data;
             dispatch(GetLocations(locations));
         })
         .catch(error=>{
             console.log(error.message);
         });
    }
}