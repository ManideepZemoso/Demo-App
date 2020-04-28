let preconditions = require("preconditions").errr();

export class Location {
    constructor({
                    id,
                    location,
                    latitude,
                    longitude
                }) {
        preconditions.shouldBeString(id,'location id');
        preconditions.shouldBeString(location,'location name');
        preconditions.shouldBeString(latitude,'location latitude');
        preconditions.shouldBeString(longitude,'location longitude');

        this.id=id;
        this.location=location;
        this.latitude=latitude;
        this.longitude=longitude;

    }
}