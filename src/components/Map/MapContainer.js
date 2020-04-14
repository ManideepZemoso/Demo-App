import React from "react";
import mapboxgl from 'mapbox-gl';
import {connect} from 'react-redux';
import {UpdateCordinates} from "../../redux/actions/mapActions";
import {Map} from './Map';
import {AddLocation} from "../../redux/actions/locationsAction";
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


class MapContainer extends React.Component {

    render() {
        return (
           <Map mapprops={this.props} />
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
