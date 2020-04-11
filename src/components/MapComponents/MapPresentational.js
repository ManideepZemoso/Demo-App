import React from "react";
import mapboxgl from "mapbox-gl";
import IconButton from "@material-ui/core/IconButton";
import PublicIcon from '@material-ui/icons/Public';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types'
import InputBase from "@material-ui/core/InputBase";


export class MapPresentational extends React.Component{
    constructor(props) {
        console.log(props);
        super(props);
    }
    render() {
        return (
           <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.props.mapProps.lng} | Latitude: {this.props.mapProps.lat} | Zoom: {this.props.mapProps.zoom}</div>
                </div>
                <InputBase
                    className='input'
                    placeholder="Longitude, Latitude"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={this.props.updateValue}
                />
                <IconButton  id="searchSubmit" type="submit" className='iconButton' aria-label="search">
                    <SearchIcon onClick={this.props.serachSubmit}/>
                </IconButton>
               <IconButton  id="changeView" type="submit" className='viewButton' style={{backgroundColor :'white',color:'black', top:'140px'}}>
                   <PublicIcon onClick={this.props.changeView}/>
               </IconButton>
                <div ref={this.props.reference} className='mapContainer' />
            </div>
        );
    }
}