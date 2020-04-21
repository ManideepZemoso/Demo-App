import {GET_LOCATIONS,ADD_LOCATION,SORT} from '../types/loctionsType';


const intialState={
    locations:[{
        id: 2,
        Location: "Hyderabad",
        Longitude: 78.4111,
        Latitude: 17.4334
    },
        {
            id: 1,
            Location: "Secundrabad",
            Longitude: 56,
            Latitude: 78
        },
        {
            id: 4,
            Location: "Chennai",
            Longitude: 56,
            Latitude: 78
        },
        {
            id: 3,
            Location: "Banglore",
            Longitude: 56,
            Latitude: 78
        }
    ],
    sort:false
}

const locationReducer=(state=intialState,action)=>{
    switch(action.type){
        case ADD_LOCATION: {
            const item={
                id: action.payload.locationId,
                Location:action.payload.locationName,
                Longitude:action.payload.lng,
                Latitude:action.payload.lat
            }
        return {
            ...state,
            locations: [
                ...state.locations,
                item
         ]
          };
        }
        case GET_LOCATIONS: return {
            ...state
        };
        case SORT: return{
            ...state,
            sort:true
        };
        default: return state;
    }
}

export default locationReducer;