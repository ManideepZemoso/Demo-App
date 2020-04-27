import * as React from "react";
import Button from "@material-ui/core/Button";
import ReactDOM from 'react-dom';

export function child(){
    return ReactDOM.createPortal(
        <Button id="AddLocationButton"variant="contained" color="primary" >Add this to location</Button>,
        document.getElementsByClassName('mapboxgl-popup-content'))
}