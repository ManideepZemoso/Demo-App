import React from 'react';
import './App.css';
import SideBar from "./components/SideBar";
import {BrowserRouter, Route, Switch,Redirect} from "react-router-dom";
import LoginForm from "./components/Logging/LoginForm";
import MapContainer from "./components/Map/MapContainer";
import LocationsContainer from "./components/Location/LocationsContainer";
import {Provider} from 'react-redux';
import store from './redux/store';



export class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isAuthenticated:false,


        }
    }
    render() {
        return (
            <Provider store={store}>
            <BrowserRouter>

                <SideBar/>
                <Switch>
                    <Route path="/" component={MapContainer} exact  appProps={this.props} ></Route>
                    <Route path="/login" component={LoginForm} appProps={this.props} />
                    <Route path="/map" component={MapContainer} appProps={this.props} store={store} />
                    <PrivateRoute exact path="/locations" component={LocationsContainer} store ={store} />
                    <PrivateRoute path="/locations/new" component={MapContainer} />
                    <PrivateRoute path="/locations/:location_id" component={MapContainer} appProps={this.props} />

                </Switch>
            </BrowserRouter>
            </Provider>

        );
    }
}

const PrivateRoute = (
    { component: Component, ...rest }) => (<Route{...rest}render={props =>window.sessionStorage.getItem('isAuthenticated') ? (<Component {...props} />) : (<Redirect to={{pathname: "/"}}/>)}/>);
