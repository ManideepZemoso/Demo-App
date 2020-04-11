import React from "react";
import {GetLocations} from "../../redux/actions/locationsAction";
import {connect} from "react-redux";
import LocationPresentation from '../LocationComponents/LocationPresentation'

let locationlist;
class Locations extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
        locationlist=props.locations;
        console.log(locationlist);
    }
    componentDidMount() {

    locationlist=this.props.GetLocations(23);
    }

    render() {
     return (

        <LocationPresentation LocationList={locationlist}> </LocationPresentation>
     );
 }
}

function mapStateToProps(state){
    return{
      locations:state.locations
    };
}

function  mapDispatchToProps(dispatch) {
    return{
        GetLocations:(zoom)=>dispatch(GetLocations(zoom))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Locations);