import React from 'react'

import { Container, Typography } from '@mui/material'

import Filter from '../../components/plotData/Filter'
import ExtendableTable from '../table/ExtendableTable'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSinglePlot } from '../../features/plotData/plotDataSlice';

const tableData = {
    head: ["Plot Number", "Type", "Status", "Total Price", "Financials", "Actions"],
    rows: []
}

const IndexContainer = (props) => {
    const navigate  = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = (row) => {
        dispatch(setSinglePlot(row.id));
        navigate(`edit/information/${row.id}`);
    }

    if(props.data.length) {
        const rowData = [];

        props.data.forEach((item) => {
            const rowItem = {plotNumber: item.plotNumber, type: item.plotType, status: item.currentStatus, totalPrice: item.totalPrice, id: item.id, financials: "TODO"}
            rowData.push(rowItem);
        });

        tableData.rows = rowData;
    }

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "backDrop.dark", height: "100vh", pt: "20px", mt: "20px" }}>
        <Typography textAlign="left" variant='h5' mb="15px">Plots</Typography>
        <Filter />
        <Box component="div" sx={{mt: "40px"}}>
            <ExtendableTable data={tableData} deleteButton={true} editButton={true} handleEdit={handleEdit}/>
        </Box>
  </Container>
  )
}

export default IndexContainer