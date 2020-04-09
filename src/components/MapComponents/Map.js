import React from "react";
import mapboxgl from 'mapbox-gl';
import {connect} from 'react-redux';
import {UpdateCordinates} from "../../redux/map/mapActions";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import PublicIcon from '@material-ui/icons/Public';
import {background} from "mapbox-gl/src/shaders";
import {MapPresentational} from './MapPresentational';
import GetLocationData from '../LocationComponents/LocationCordinates.json';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


let LatNLong='19,13';

class Map extends React.Component {
 map;
 mapRef=React.createRef();

    constructor(props) {
        super(props);
    this.searchSubmit=this.searchSubmit.bind(this);
    this.changeView=this.changeView.bind(this);
    this.updateValue=this.updateValue.bind(this);
    }
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container:this.mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.lng ,this.props.lat],
            zoom: this.props.zoom
        });

        this.map.on('move',()=> {this.props.UpdateCordinates( this.map.getCenter().lng, this.map.getCenter().lat, this.map.getZoom())});
        let id=this.props.match.params.location_id;
        let isCallFromLocation=false;
        let locationid;
        console.log(id);
        for(var i=0;i<GetLocationData.length;i++){
            console.log(GetLocationData[i]);
            if(id==GetLocationData[i].id){
                console.log(GetLocationData[i]);
                isCallFromLocation=true;
                locationid=i;
                break;
            }
        }
        if(!isCallFromLocation){
            this.props.history.push('/map');
        }
        else{
           LatNLong= GetLocationData[locationid].Longitude +"," +GetLocationData[locationid].Latitude;
           console.log(LatNLong);
             this.searchSubmit();
        }


    }
    updateValue(e){
        //console.log(e);
        LatNLong=e.target.value;
        //console.log(LatNLong);
    }
    searchSubmit() {
        console.log(LatNLong);
        this.map.flyTo({
            center: [
                LatNLong.split(',')[0],
                LatNLong.split(',')[1]
            ],zoom:15
        });
    }

    changeView(){
        console.log(LatNLong);
        if(this.map.getStyle().name ==='Mapbox Streets'){
            this.map.setStyle('mapbox://styles/mapbox/satellite-v9' );
        }
        else{
            this.map.setStyle('mapbox://styles/mapbox/streets-v11' );
        }
    }

    render() {
        return (
           <MapPresentational reference={this.mapRef} mapProps={this.props} changeView={this.changeView} serachSubmit={this.searchSubmit} updateValue={this.updateValue}/>
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
