import React, { useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const ExtendableTable = (props) => {

    const rowArray = [];

    if(props.data.actions){
        props.data.rows.forEach(element => {
            console.log("element = ", element);
            props.data.actions.forEach((action) => {
                // Pushing twice FIX
                rowArray.push({...element, action});
            })
            console.log("rowArray = ", rowArray);
        });
    }

  return (
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: "darkgray"}}>
          <TableRow>
            {props.data.head.map((item, index) => (
                 <TableCell key={index + "31"} align="left">{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.rows.map((row, index) => (
      
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             {Object.values(row).map((r, inx) => {
              
                return (
                    <TableCell key={inx + "41"}>{r}</TableCell>
                )
                
             })}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExtendableTable

// Check the data inside this comp..
// if actions is present add the action into the row array