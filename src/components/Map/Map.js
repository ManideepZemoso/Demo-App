import React from "react";
import mapboxgl from "mapbox-gl";
import IconButton from "@material-ui/core/IconButton";
import PublicIcon from '@material-ui/icons/Public';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Button from "@material-ui/core/Button";

let LatNLong='19,13';

export class Map extends React.Component{
    map;
    constructor(props) {
        console.log(props.mapStyle);
        console.log(props);
        super(props);
        this.searchSubmit=this.searchSubmit.bind(this);
        this.changeView=this.changeView.bind(this);
        this.updateValue=this.updateValue.bind(this);
        this.zoomIn= this.zoomIn.bind(this);
        this.zoomOut=this.zoomOut.bind(this);
        this.addLocation=this.addLocation.bind(this);
    }
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: this.props.mapStyle,
            center: [this.props.lat, this.props.lng],
            zoom: 6
        });

        this.map.on('moveend', () => {
            this.props.UpdateCordinates(this.map.getCenter().lng, this.map.getCenter().lat, this.map.getZoom())
        });
        this.map.on('click',(e)=>{this.getCordinate(e)} );

       if(this.props.isCallFromLocation){
             LatNLong= this.props.lat+','+ this.props.lng;
             console.log(LatNLong);
             this.searchSubmit();
         }

     }
     getCordinate(e){
         let coordinate = this.map.unproject(e.point);
         let popup = new mapboxgl.Popup({ closeOnClick: false })
             .setLngLat(coordinate)
             .setHTML(`<h4>${coordinate}</h4>`)
             .addTo(this.map);
         LatNLong=coordinate.lng+','+coordinate.lat;
         console.log(coordinate);
         console.log(LatNLong);
     }
     addLocation(){
         this.props.AddLocation(this.props.lastlocationId+2,'Location-'+((this.props.lastlocationId)+2),LatNLong.split(',')[0],LatNLong.split(',')[1]);
     }

     updateValue(e){
         LatNLong=e.target.value;
     }
     searchSubmit() {
         console.log(LatNLong);
         this.map.flyTo({
             center: [
                 LatNLong.split(',')[0],
                 LatNLong.split(',')[1]
             ],zoom:15
         });
         let marker = new mapboxgl.Marker()
             .setLngLat(LatNLong.split(','))
             .addTo(this.map);
         // this.props.AddLocation(5,'newplace',LatNLong.split(',')[0],LatNLong.split(',')[1]);
     }
    changeView(){
        this.props.UpdateMapStyle();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.mapStyle!==this.props.mapStyle){
            this.map.setStyle(this.props.mapStyle);
        }
    }

    zoomIn(){
        this.map.zoomIn();
    }
    zoomOut(){
        this.map.zoomOut();

    }
    render() {
        return (
           <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.props.lng} | Latitude: {this.props.lat} | Zoom: {this.props.zoom}</div>
                </div>
               <div className='searchboxStyle'>
                   <InputBase
                       className='input'
                       placeholder="Lng,Lat"
                       inputProps={{ 'aria-label': 'search google maps' }}
                       onChange={this.updateValue}
                   />
                   <IconButton  id="searchSubmit" type="submit" className='iconButton' aria-label="search">
                       <SearchIcon onClick={this.searchSubmit}/>
                   </IconButton>
               </div>
               <div className='buttonStyle'>
                   <IconButton  id="changeView" type="submit" className='viewButton' >
                       <PublicIcon onClick={this.changeView}/>
                   </IconButton>
                   <IconButton  id="zoomIn" type="submit" className='viewButton' >
                       <ZoomInIcon onClick={this.zoomIn}/>
                   </IconButton>
                   <IconButton  id="zoomOut" type="submit" className='viewButton' >
                       <ZoomOutIcon onClick={this.zoomOut}/>
                   </IconButton>
               </div>

                       <div className='addLocationStyle'>
                           <Button id="AddLocationButton"variant="contained" color="primary"  onClick={this.addLocation} disabled={!(this.props.isFromNewlocation)}>Add this to location</Button>
                       </div>

                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        );
    }
}