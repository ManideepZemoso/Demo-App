import React from "react";
import {NavLink} from "react-router-dom";


export class Logout extends React.Component{
    constructor(props) {
        super(props);
        window.sessionStorage.clear();
    }
    render() {
        return (
            <h3>You are logged out of the system. Click
                <NavLink Style={{
                    fontWeight: "bold"}} to='/'> here</NavLink> to login again.

            </h3>
    );
    }
}