import React from "react";
import {fetchLocations,updateSort} from "../../redux/actions/locationsAction";
import {connect} from "react-redux";
import Locations from './Locations'

let locationlist;
class LocationsContainer extends React.Component{
    constructor(props) {
        super(props);
        locationlist=props.locations;
        this.updateToBrowser=this.updateToBrowser.bind(this);
        this.updateToNavlink=this.updateToNavlink.bind(this);
        this.sortFn=this.sortFn.bind(this);

    }
    componentDidMount() {
        if(this.props.locations.length===0){
            locationlist=this.props.fetchLocations();
        }
        console.log(locationlist);

    }
    updateToNavlink(id) {
        this.props.history.push('/locations/'+id);
    }

    updateToBrowser(){
        this.props.history.push('/locations/new');
    }
    sortFn(){
        this.props.updateSort();
    }

    render() {

     return (

         <Locations sort={this.props.sort} sortFn={this.sortFn} updateToBrowser={this.updateToBrowser} LocationList={this.props.locations} updateToNavlink={this.updateToNavlink}> </Locations>

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
        fetchLocations:()=>dispatch(fetchLocations()),
        updateSort:()=>dispatch(updateSort())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(LocationsContainer);