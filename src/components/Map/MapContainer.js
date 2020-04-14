import React from "react";
import mapboxgl from 'mapbox-gl';
import {connect} from 'react-redux';
import {UpdateCordinates} from "../../redux/actions/mapActions";
import {Map} from './Map';
import {AddLocation} from "../../redux/actions/locationsAction";
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

let lastlocationId;
let isFromNewlocation;
let locationList;
let locationid;
let isCallFromLocation;
class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        locationList=props.locationList;
        isFromNewlocation = false;
        console.log(isFromNewlocation);
        if(props.match.path==='/locations/new'){
            isFromNewlocation=true;
            console.log(isFromNewlocation);
        }
        let id=props.match.params.location_id;
        isCallFromLocation=false;

        console.log(isFromNewlocation);
        for(let i=0;i<locationList.length;i++){
            console.log(locationList[i]);
            lastlocationId=i;
            if(id==locationList[i].id){
                console.log(locationList[i]);
                isCallFromLocation=true;
                this.props.UpdateCordinates(locationList[i].Latitude, locationList[i].Longitude, 15)
                locationid=i;
                break;
            }

        }
        if(!isCallFromLocation && !isFromNewlocation){
            this.props.history.push('/map');
        }
    }
    render() {
        return (
           <Map lat={this.props.lat} lng={this.props.lng} isCallFromLocation={isCallFromLocation} isFromNewlocation={isFromNewlocation} UpdateCordinates={this.props.UpdateCordinates} AddLocation={this.props.AddLocation} lastlocationId={lastlocationId}/>
        );
    }



}

function mapStateToProps ({map,location}){
    return{
        lat:map.lat,
        lng:map.lng,
        zoom:map.zoom,
        locationList:location.locations
    };
}
function mapDispatchToProps(dispatch){
    return {
        UpdateCordinates: (lng,lat,zoom) =>dispatch(UpdateCordinates(lng,lat,zoom )),
        AddLocation:(locationId,locationName,lng,lat) =>dispatch(AddLocation(locationId,locationName,lng,lat))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(MapContainer);
