import React from "react";
import {GetLocations,updateSort} from "../../redux/actions/locationsAction";
import {connect} from "react-redux";
import Locations from './Locations'

let locationlist;
class LocationsContainer extends React.Component{
    constructor(props) {
        super(props);
        locationlist=props.locations;
        this.updateToBrowser=this.updateToBrowser.bind(this);
        this.sortFn=this.sortFn.bind(this);
    }
    updateToBrowser(){
        this.props.history.push('/locations/new');
    }
    sortFn(){
        this.props.updateSort();
    }

    render() {
     return (

        <Locations sort={this.props.sort} sortFn={this.sortFn} updateToBrowser={this.updateToBrowser} LocationList={locationlist}> </Locations>
     );
 }
}

function mapStateToProps({location}){
    return{
      locations:location.locations,
        sort:location.sort
    };
}

function  mapDispatchToProps(dispatch) {
    return{
        GetLocations:()=>dispatch(GetLocations()),
        updateSort:()=>dispatch(updateSort())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(LocationsContainer);