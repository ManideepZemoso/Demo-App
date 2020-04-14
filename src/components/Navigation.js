import React from "react";
import {NavLink} from "react-router-dom";
import Button from '@material-ui/core/Button';

class Navigation extends React.Component{
    onSubmitLogout=(e)=>{
        e.preventDefault();
        window.sessionStorage.setItem('isAuthenticated','false');
        window.sessionStorage.clear();
        window.location="/";

    }
    render() {
        const isLogedInSuccesfully=window.sessionStorage.getItem('isAuthenticated');
        let element='Login';
        let toElement='/login';
        if(isLogedInSuccesfully){
            element='Logout';
            // toElement='/Logout';
            return (
                <div style={{display: 'flex', postion: 'relative'}} className="container">
                    <nav style={{
                        display: 'flex', position: 'absolute',
                        bottom: 0
                    }} className="navbar">

                       {/*<NavLink Style={{ width:"240px",*/}
                       {/*  fontWeight: "bold"}} to={toElement}><Button variant="contained" color="primary">*/}
                       {/*     {element}*/}
                       {/* </Button></NavLink>*/}

                        <button style={{backgroundColor:'#3f51b5',width:'238px',color:'white',height:'40px',paddingBottom:'10px',paddingTop:'10px',fontSize:'20px',textAlign:'center'}} onClick={e => this.onSubmitLogout(e)}>
                            {element}
                        </button>

                    </nav>
                </div>

            );
        }
        else{
            element='Login';
            toElement='/login';
            return (
                <div style={{display: 'flex', postion: 'relative'}} className="container">
                    <nav style={{
                        display: 'flex', position: 'absolute',
                        bottom: 0
                    }} className="navbar">

                        <NavLink Style={{
                            fontWeight: "bold"}} to={toElement}><Button variant="contained" color="primary" style={{fontSize:"15px",paddingLeft:"20px", width:'238px',marginBottom:'10px'}}>
                            {element}
                        </Button></NavLink>

                    </nav>
                </div>

            );

        }

    }
}


export default (Navigation);