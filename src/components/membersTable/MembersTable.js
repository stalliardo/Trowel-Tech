import React from 'react'

// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];




const MembersTable = (props) => {
  console.log("props = ", props.data.members);
  return (
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: "darkgray"}}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Member Type</TableCell>
            <TableCell align="center">Day Rate</TableCell>
            <TableCell align="center">Skill</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.members.map((row, index) => (
            
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName + " " + row.lastName}
              </TableCell>
              <TableCell align="center">{row.memberType}</TableCell>
              <TableCell align="center">{row.dayRate}</TableCell>
              <TableCell align="center">{row.skill}</TableCell>
              <TableCell align="center">
                {/* Display the edit and delete buttons here */}
                <Button variant='contained' sx={{mr: "20px"}}>Edit</Button>
                <Button variant='contained' color='warning' onClick={() => props.onDeleteClicked(row) }>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MembersTable