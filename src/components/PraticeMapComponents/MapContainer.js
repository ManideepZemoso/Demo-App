import React from "react";
import mapboxgl from "mapbox-gl";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import {UpdateCordinates} from "../../redux/actions/mapActions";
import {connect} from "react-redux";

class MapContainer extends React.Component{
    constructor(props) {
        console.log(props);
        super(props);
    }

    render() {
        return (
         <MapPresentational mapStyle={'mapbox://styles/mapbox/streets-v11'} lat={this.props.lat} lon={this.props.lng} zoom={this.props.zoom} ></MapPresentational>
        );
    }
}

function mapStateToProps (state){
    return{
        lat:state.lat,
        lng:state.lng,
        zoom:state.zoom
    };
}
function mapDispatchToProps(dispatch){
    return {
        UpdateCordinates: (lng,lat,zoom) =>dispatch(UpdateCordinates(lng,lat,zoom ))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Map);
