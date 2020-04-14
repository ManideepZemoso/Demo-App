import React from "react";
import {GetLocations} from "../../redux/actions/locationsAction";
import {connect} from "react-redux";
import Locations from './Locations'

let locationlist;
class LocationsContainer extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
        locationlist=props.locations;
        console.log(locationlist);
    }
    componentDidMount() {
        this.props.GetLocations();
    locationlist=this.props.locations;
        console.log(locationlist);
    }

    render() {
     return (

        <Locations LocationList={locationlist}> </Locations>
     );
 }
}

function mapStateToProps({location}){
    return{
      locations:location.locations
    };
}

function  mapDispatchToProps(dispatch) {
    return{
        GetLocations:()=>dispatch(GetLocations())

    };
}
export default connect(mapStateToProps,mapDispatchToProps)(LocationsContainer);