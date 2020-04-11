import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PublicIcon from '@material-ui/icons/Public';




class MapPresentational extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        return (
      /*      <div>
        {/!*        <div className='sidebarStyle'>
                    <div>Longitude: {this.props.lng} | Latitude: {this.props.lat} | Zoom: {this.props.zoom}</div>
                </div>
                <InputBase
                    className='input'
                    placeholder="Longitude, Latitude"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={e => {LatNLong=e.target.value}}
                />
                <IconButton  id="searchSubmit" type="submit" className='iconButton' aria-label="search">
                    <SearchIcon />
                </IconButton>
                <IconButton  id="searchSubmit" type="submit" className='iconButton' aria-label="search">
                    <PublicIcon />
                </IconButton>*!/}*/
                <div ref={this.props.reference} className='mapContainer' />
          /*  </div>*/
        );
    }
}
export default (MapPresentational);