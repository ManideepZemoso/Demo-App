import {GET_LOCATIONS,ADD_LOCATION,SORT} from '../types/loctionsType';


const intialState={
    locations:[],
    sort:false
}

const locationReducer=(state=intialState,action)=>{
    switch(action.type){
        case ADD_LOCATION: {
            const item={
                id: action.payload.locationId,
                location:action.payload.locationName,
                longitude:action.payload.lng,
                latitude:action.payload.lat
            }
        return {
            ...state,
            locations: [
                ...state.locations,
                item
         ]
          };
        }
        case GET_LOCATIONS:
            return {
            ...state,
            locations:action.payload.locations,
        };
        case SORT: return{
            ...state,
            sort:true
        };
        default: return state;
    }
}

export default locationReducer;