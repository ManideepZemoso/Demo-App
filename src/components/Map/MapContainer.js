import React from "react";
import mapboxgl from 'mapbox-gl';
import {connect} from 'react-redux';
import {UpdateCordinates, UpdateMapStyle} from "../../redux/actions/mapActions";
import Map from './Map';
import {AddLocation} from "../../redux/actions/locationsAction";
import SideBar from "../SideBar";
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

let lastlocationId;
let isFromNewlocation;
let locationList;
let isCallFromLocation;
let locationid;
class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        locationList=props.locationList;
        isFromNewlocation = false;
        if(props.match.path==='/locations/new'){
            isFromNewlocation=true;
        }
        locationid=props.match.params.location_id;
        isCallFromLocation=false;

        for(let i=0;i<locationList.length;i++){
            lastlocationId=i;
            if(locationid==locationList[i].id){
                isCallFromLocation=true;
                this.props.UpdateCordinates(locationList[i].latitude, locationList[i].longitude, 15);
                break;
            }

        }
        if(!isCallFromLocation && !isFromNewlocation){
            this.props.history.push('/map');
        }
    }
    render() {
        return (
            <div>
            <SideBar/>
           <Map lat={this.props.lat} lng={this.props.lng} zoom={this.props.zoom} mapStyle={this.props.mapStyle}  UpdateMapStyle={this.props.UpdateMapStyle} toolTipContent={this.props.locationList[locationid-1]}
                isCallFromLocation={isCallFromLocation} isFromNewlocation={isFromNewlocation} UpdateCordinates={this.props.UpdateCordinates} AddLocation={this.props.AddLocation} lastlocationId={lastlocationId}/>
            </div>
                );
    }



}

function mapStateToProps ({map,location}){
    return{
        lat:map.lat,
        lng:map.lng,
        zoom:map.zoom,
        mapStyle:map.mapStyle,
        locationList:location.locations
    };
}
function mapDispatchToProps(dispatch){
    return {
        UpdateCordinates: (lng,lat,zoom) =>dispatch(UpdateCordinates(lng,lat,zoom )),
        UpdateMapStyle:()=>dispatch(UpdateMapStyle()),
        AddLocation:(locationId,locationName,lng,lat) =>dispatch(AddLocation(locationId,locationName,lng,lat))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(MapContainer);
