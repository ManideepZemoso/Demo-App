import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './redux/store';
import Router from "./components/Router";



export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                </Router>
               </Provider>

        );
    }
}


