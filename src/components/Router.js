import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import MapContainer from "./Map/MapContainer";
import LoginForm from "./Logging/LoginForm";
import LocationsContainer from "./Location/LocationsContainer";
import React from "react";
import SideBar from "./SideBar";



export default class Router extends React.Component{

    render() {
        return (
        <BrowserRouter>
            <SideBar/>
            <Switch>
                <Route path="/" component={MapContainer} exact  appProps={this.props} ></Route>
                <Route path="/login" component={LoginForm} appProps={this.props} />
                <Route path="/map" component={MapContainer} appProps={this.props}/>
                <PrivateRoute exact path="/locations" component={LocationsContainer}  />
                <PrivateRoute path="/locations/new" component={MapContainer} />
                <PrivateRoute path="/locations/:location_id" component={MapContainer} appProps={this.props} />
            </Switch>
        </BrowserRouter>
        );
    }
}

const PrivateRoute = (
    { component: Component, ...rest }) => (<Route{...rest}render={props =>window.sessionStorage.getItem('isAuthenticated') ? (<Component {...props} />) : (<Redirect to={{pathname: "/"}}/>)}/>);
