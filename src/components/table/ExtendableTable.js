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

// need a function that checks if there is any data in the otherData array
// if so add to the row but flag as notInclusive







const ExtendableTable = (props) => {        
  const handleEditClicked = (row, data) => {
    if(data) {
      props.handleEdit({...row, ...data});
    } else {
      props.handleEdit(row)
    }
  }

  const handleDeleteClicked = (row) => {
    props.handleDelete(row);
  }

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
              {Object.keys(row).map((r, inx) => {
                return (
                  r !== "id" && <TableCell key={inx + "41"}>{row[r]}</TableCell>
                )
              })}

              {(props.deleteButton || props.editButton) &&
                <TableCell sx={{ width: "100px" }}>
                  {props.editButton && <IconButton color="primary" onClick={() => handleEditClicked(row, props.data.otherData?.[index])}><EditIcon /></IconButton>}
                  {props.deleteButton && <IconButton color='error' onClick={() => handleDeleteClicked(row)}> <DeleteIcon /> </IconButton>}
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