import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";

class Locations extends React.Component{
    constructor(props){
        super(props);
        this.sortById=this.sortById.bind(this);
    }

    sortById() {
        this.props.LocationList.sort((a, b) => (a.id > b.id) ? 1 : -1);
        this.forceUpdate();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.sort!==this.props.sort && this.props.sort===true){
            this.sortById();
        }
    }

    render(){
        return (

            <div style={{padding: '20px',
                marginTop: '60px'}}>
                <div>
                    <h1>Locations</h1>
                    <div style={{marginBottom:'10px'}}>
                        <button testId="sortBtn" onClick={this.props.sortFn}> SortBy Id</button>
                       <button testId="AddNewLocationBtn" onClick={this.props.updateToBrowser}>Add new location</button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table className='' aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Location</TableCell>
                                    <TableCell align="right">Longitude</TableCell>
                                    <TableCell align="right">Latitude</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.LocationList.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right"><NavLink to={'/locations/'+ row.id}> <Button  style={{height:'30px',fontSize:'10px',fontWeight:'bold'}} variant="contained" color="primary">{row.Location}</Button>
                                        </NavLink></TableCell>
                                        <TableCell align="right">{row.Longitude}</TableCell>
                                        <TableCell align="right">{row.Latitude}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>


            </div>
        );

    }


}
export default Locations;
