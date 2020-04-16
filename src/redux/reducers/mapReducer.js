import  {UPDATE_CORDINATES,UPDATE_MAPSTYLE} from "../types/mapType";


const intialState={
    lng: 78.486671,
    lat: 17.385044,
    zoom: 5,
    mapStyle:'mapbox://styles/mapbox/streets-v11'
}
const mapReducer =(state= intialState ,action) => {
    console.log(state);
    switch(action.type){
        case UPDATE_CORDINATES: return {
            ...state,
            lat:action.payload.lat,
            lng:action.payload.lng,
            zoom:action.payload.zoom
        };
        case UPDATE_MAPSTYLE:
            if(state.mapStyle === 'mapbox://styles/mapbox/streets-v11'){
                return {
                    ...state,
                    mapStyle:'mapbox://styles/mapbox/satellite-v9'
                }
            }
            else{
                return {
                    ...state,
                    mapStyle:'mapbox://styles/mapbox/streets-v11'
                }
            };
        default :return state;

    }
}

export default mapReducer;
