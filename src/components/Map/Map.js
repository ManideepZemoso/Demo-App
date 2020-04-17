import React from "react";
import mapboxgl from "mapbox-gl";
import IconButton from "@material-ui/core/IconButton";
import PublicIcon from '@material-ui/icons/Public';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

const styles ={
    sidebarStyle: {
    display: 'inline-block',
    position: 'absolute',
    top: '80px',
    right:'0',
    margin: '12px',
    backgroundColor: '#404040',
    color: '#ffffff',
    zIndex: '1 !important',
    padding: '6px',
    fontWeight: 'bold'
},
    buttonStyle:{
    position: 'absolute',
    bottom: '50px',
    right:'0',
    margin: '12px',
    backgroundColor: 'white',
    color: 'black',
    zIndex: '2 !important',
    padding: '6px',
    fontWeight: 'bold'
},
    changeVIew:{
    backgroundColor: 'white',
    color: 'black',
    display: 'inline-list-item'
},
    zoomIn:{
    backgroundColor: 'white',
    color: 'black',
    display: 'inline-list-item'
},
    zoomOut:{
        backgroundColor: 'white',
        color: 'black',
        display: 'inline-list-item'
    },
    addLocationStyle:{
    display: 'inline-block',
    position: 'absolute',
    top: '300px',
    right:'0',
    margin: '12px',
    zIndex: '1 !important',
    padding: '6px',
    fontWeight: 'bold'
},
    searchboxStyle:{
    position: 'absolute',
    top:'200px',
    margin: '12px',
    backgroundColor: 'white',
    color: 'black',
    zIndex: '2 !important',
    padding: '6px',
    left:'40%',
    fontWeight: 'bold'
},
    searchSubmit:{
    backgroundColor: 'white',
    color: 'black',
    zIndex: '2'
},
    input:{
    position: 'absolute',
    padding: '10px',
    backgroundColor: 'white',
    color: '#ffffff',
    zIndex: '1 !important',
    fontWeight: 'bold',
    width:'100px'
},
    mapContainer:{
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    bottom: '0'
}

};



let LatNLong='19,13';

class Map extends React.Component{
    map;
    constructor(props) {
        /*console.log(props.mapStyle);
        console.log(props);*/
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
        // console.log(LatNLong);
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
        const {classes}=this.props;
        return (
           <div>
                <div className={classes.sidebarStyle}>
                    <div>Longitude: {this.props.lng} | Latitude: {this.props.lat} | Zoom: {this.props.zoom}</div>
                </div>
               <div className={classes.searchboxStyle}>
                   <InputBase
                       className='input'
                       placeholder="Lng,Lat"
                       inputProps={{ 'aria-label': 'search google maps' }}
                       onChange={this.updateValue}
                   />
                   <IconButton  id='searchSubmit' type="submit" className={classes.searchSubmit} aria-label="search">
                       <SearchIcon onClick={this.searchSubmit}/>
                   </IconButton>
               </div>
               <div className={classes.buttonStyle}>
                   <IconButton   id='changeView' type="submit" className={classes.changeVIew}>
                       <PublicIcon onClick={this.changeView}/>
                   </IconButton>
                   <IconButton  id='zoomIn'  type="submit" className={classes.zoomIn }>
                       <ZoomInIcon  onClick={this.zoomIn}/>
                   </IconButton>
                   <IconButton  id='zoomOut' type="submit" className={classes.zoomOut} >
                       <ZoomOutIcon onClick={this.zoomOut}/>
                   </IconButton>
               </div>

                       <div className={classes.addLocationStyle}>
                           <Button id="AddLocationButton"variant="contained" color="primary"  onClick={this.addLocation} disabled={!(this.props.isFromNewlocation)}>Add this to location</Button>
                       </div>

                <div ref={el => this.mapContainer = el} className={classes.mapContainer} />
            </div>
        );
    }
}
export default withStyles(styles)(Map);