import React from 'react';
import './App.css';
import SideBar from "./components/SideBar";
import {BrowserRouter, Route, Switch,Redirect} from "react-router-dom";
import LoginForm from "./components/LoggingComponents/LoginForm";
import {Logout} from "./components/junk components/Logout";
import Map from "./components/MapComponents/Map";
import {NewMap} from "./components/MapComponents/NewMap";
import {NewLocation} from "./components/LocationComponents/NewLocation";
import Locations from "./components/LocationComponents/Locations";
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
                    <Route path="/" component={Map} exact  appProps={this.props} ></Route>
                    <Route path="/login" component={LoginForm} appProps={this.props} />
                    <Route path="/map" component={Map} appProps={this.props} store={store} />
                    <PrivateRoute exact path="/locations" component={Locations} store ={store} />
                    <PrivateRoute path="/locations/new" component={Map} />
                    <PrivateRoute path="/locations/:location_id" component={Map} appProps={this.props} />

                </Switch>
            </BrowserRouter>
            </Provider>

        );
    }
}

const PrivateRoute = (
    { component: Component, ...rest }) => (<Route{...rest}render={props =>window.sessionStorage.getItem('isAuthenticated') ? (<Component {...props} />) : (<Redirect to={{pathname: "/"}}/>)}/>);
