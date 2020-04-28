import {Location} from '../components/Location/Location';

let preconditions = require("preconditions").errr();
export const convertServiceTolocation=(serviceLocation)=>{
    preconditions.shouldBeObject(serviceLocation)
    const id=serviceLocation.id;
    const location=serviceLocation.location;
    const latitude=serviceLocation.latitude;
    const longitude=serviceLocation.longitude;

    return new Location({
        id,
        location,
        latitude,
        longitude
    });

}

export const convertServiceTolocationPayload =(items)=>{
    preconditions.shouldBeArray(items);
    return {
        locations:items.map(convertServiceTolocation)
    }

};




