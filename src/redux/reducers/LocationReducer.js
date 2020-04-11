import {GET_LOCATIONS} from '../types/loctionsType';

const locationReducer=(state=[],action)=>{
    console.log(state);
    switch(action.type){
        case GET_LOCATIONS: return{
            ...state,
            zoom:action.payload.zoom
        };
        default: return state;
    }
}

export default locationReducer;