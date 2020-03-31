import React from 'react';
import './App.css';
import PersistentDrawerLeft from "./components/drawer";



export class App extends React.Component {
    render() {
        return (
            <div>
                <PersistentDrawerLeft />
            </div>
        );
    }
}
