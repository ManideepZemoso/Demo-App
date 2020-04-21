import locationReducer from "../redux/reducers/LocationReducer";
import {ADD_LOCATION, GET_LOCATIONS} from "../redux/types/loctionsType";


const state={
    locations:[
        {
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
        }
    ],
    sort:false
};
const newlocation={
    id: 3,
    Location: "Banglore",
    Longitude: 56,
    Latitude: 78
};
const finalState={
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


describe('post reducer', () => {
    it('should return the initial state', () => {
        expect(locationReducer(state, {})).toEqual(state);
    });
    it('should handle GET_LOCATIONS', () => {
        // it's empty on purpose because it's just starting to fetch posts
        expect(locationReducer(state, 'GET_LOCATIONS')).toEqual(state);
    });
    it('should handle ADD_LOCATION', () => {
        const updateAction = {
            type: ADD_LOCATION,
            payload:{locationId: 3,
                locationName: "Banglore",
                lng: 56,
                lat: 78},
        };
        const middleState=locationReducer(state, updateAction);
        expect(middleState).toEqual(finalState);
    });

});