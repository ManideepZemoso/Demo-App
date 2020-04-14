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
let locationList;
let locationid;
let lastlocationId;
let isFromNewlocation;
export class Map extends React.Component{
    map;
    constructor(props) {
        console.log(props);
        super(props);
        locationList=props.mapprops.locationList;


        isFromNewlocation = false;
        if(props.mapprops.match.path==='/locations/new'){
            isFromNewlocation=true;
        }
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
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.mapprops.lat, this.props.mapprops.lng],
            zoom: 6
        });

        this.map.on('moveend', () => {
            this.props.mapprops.UpdateCordinates(this.map.getCenter().lng, this.map.getCenter().lat, this.map.getZoom())
        });
        this.map.on('click',(e)=>{this.getCordinate(e)} );
        let id=this.props.mapprops.match.params.location_id;
        let isCallFromLocation=false;

         console.log(isFromNewlocation);
         for(let i=0;i<locationList.length;i++){
             console.log(locationList[i]);
             if(id===locationList[i].id){
                 console.log(locationList[i]);
                 isCallFromLocation=true;
                 locationid=i;
                 break;
             }
             lastlocationId=i;
         }
         if(!isCallFromLocation && !isFromNewlocation){
             this.props.mapprops.history.push('/map');
         }
         else if(isCallFromLocation){
             LatNLong= locationList[locationid].Longitude +"," +locationList[locationid].Latitude;
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
         this.props.mapprops.AddLocation(lastlocationId+2,'Location-'+(lastlocationId+2),LatNLong.split(',')[0],LatNLong.split(',')[1]);
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
        console.log(LatNLong);
        if(this.map.getStyle().name ==='Mapbox Streets'){
            this.map.setStyle('mapbox://styles/mapbox/satellite-v9' );
        }
        else{
            this.map.setStyle('mapbox://styles/mapbox/streets-v11' );
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
                    <div>Longitude: {this.props.mapprops.lng} | Latitude: {this.props.mapprops.lat} | Zoom: {this.props.mapprops.zoom}</div>
                </div>
                <InputBase
                    className='input'
                    placeholder="Longitude, Latitude"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={this.updateValue}
                />
                <IconButton  id="searchSubmit" type="submit" className='iconButton' aria-label="search">
                    <SearchIcon onClick={this.searchSubmit}/>
                </IconButton>
               <IconButton  id="changeView" type="submit" className='viewButton' style={{backgroundColor :'white',color:'black', top:'140px'}}>
                   <PublicIcon onClick={this.changeView}/>
               </IconButton>
               <IconButton  id="zoomIn" type="submit" className='viewButton' style={{backgroundColor :'white',color:'black', top:'140px'}}>
                   <ZoomInIcon onClick={this.zoomIn}/>
               </IconButton>
               <IconButton  id="zoomOut" type="submit" className='viewButton' style={{backgroundColor :'white',color:'black', top:'140px'}}>
                   <ZoomOutIcon onClick={this.zoomOut}/>
               </IconButton>
              {/* <input  id='locationName' type='text' value={"LoctionName"}></input*/}>
              {/* {!isFromNewlocation ? <Button id="AddLocationButton"variant="contained" color="primary" style={{top: '200px',
               zIndex: '2',
               left: '1000px' }} onClick={this.addLocation} diabled>Add this to location</Button>:
                   <Button id="AddLocationButton"variant="contained" color="primary" style={{top: '200px',
                       zIndex: '2',
                       left: '1000px' }} onClick={this.addLocation} >Add this to location</Button>}*/}
               <Button id="AddLocationButton"variant="contained" color="primary" style={{top: '200px',
                   zIndex: '2',
                   left: '1000px' }} onClick={this.addLocation} disabled={!isFromNewlocation}>Add this to location</Button>}
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        );
    }
}