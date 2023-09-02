import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const allowRowToRender = (key, disallowedKeys) => {
  let canRender = true;
  if(disallowedKeys?.length) {
    disallowedKeys.forEach((k) => {
      if(key === k) canRender = false;
    })
  }

  if(key === "id") canRender = false;

  return canRender;
}

const ExtendableTable = (props) => {
  const handleEditClicked = (row) => {
    props.handleEdit(row);
  }

  const handleDeleteClicked = (row) => {
    props.handleDelete(row);
  }

  return (
    <TableContainer component={Paper} elevation={8}>
      <Table sx={{ minWidth: 650, "td, th": {color: "black", fontWeight: "bold", letterSpacing: "1px"} }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "lightgrey" }}>
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
                 allowRowToRender(r, props.disallowedKeys) ? <TableCell key={inx + "41"}>{row[r]}</TableCell> : null
                )
              })}

              {(props.deleteButton || props.editButton) &&
                <TableCell sx={{ width: "100px" }}>
                  {props.editButton && <IconButton color="primary" onClick={() => handleEditClicked(row)}><EditIcon /></IconButton>}
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