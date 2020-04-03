import React from 'react';
import './App.css';
import SideBar from "./components/SideBar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginForm from "./components/LoggingComponents/LoginForm";
import {Logout} from "./components/junk components/Logout";




export class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isAuthenticated:false,


        }
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={SideBar} exact  appProps={this.props} ></Route>
                    <Route path="/login" component={LoginForm} appProps={this.props} />
                    <Route path="/logout" component={Logout} appProps={this.props} />
                </Switch>
            </BrowserRouter>
        );
    }
}
