import React from "react";
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import GetLocationData from './LocationCordinates.json';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";


class Locations extends React.Component{
 render() {
     return (
         <div style={{textAlign:'center'}}>
           {/* <NavLink to='/locations/new'> <Button  style={{ margin: '0 auto',
                top:'100px'
             }} variant="contained" color="primary"><h1>Add new location</h1></Button>
            </NavLink>*/}

             <div>
                 <h1>Locations</h1>
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
                             {GetLocationData.map((row) => (
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