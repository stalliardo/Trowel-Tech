import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const ExtendableTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "darkgray" }}>
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

              {(props.deleteButton || props.editButton) &&
                <TableCell sx={{width: "100px"}}>
                  {props.editButton && <IconButton color="primary"><EditIcon /></IconButton>}
                 {props.editButton &&  <IconButton color='error'> <DeleteIcon /> </IconButton>}
                 
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExtendableTable