import React from 'react'

import { Container, Typography } from '@mui/material'

import Filter from '../../components/plotData/Filter'
import ExtendableTable from '../table/ExtendableTable'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePlotData, setQueryParam, setSinglePlot } from '../../features/plotData/plotDataSlice';
import LinkButton from '../button/LinkButton';

const tableData = {
    head: ["Plot Number", "Type", "Status", "Total Price", "Financials", "Actions"],
    rows: []
}

const IndexContainer = (props) => {
    const navigate  = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = (row) => {
        dispatch(setSinglePlot(row.id));
        dispatch(setQueryParam(row.id));
        navigate(`edit/information/${row.id}`);
    }

    const handleDelete = (row) => {
        const confirmation = window.confirm(`Are you sure you want to delete plot ${row.plotNumber}?`);
        if(confirmation) {
            dispatch(deletePlotData(row.id));
        }
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
    <Container maxWidth="lg" sx={{ backgroundColor: "backDrop.dark", height: "fit-content", pt: "20px", mt: "20px", pb: "20px", borderRadius: "5px" }}>
        <Box component="div" sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography textAlign="left" variant='h5' mb="15px">Plots</Typography>
            <LinkButton to="edit/information" text="Add Plot"/>
        </Box>
        <Filter />
        <Box component="div" sx={{mt: "40px"}}>
            <ExtendableTable data={tableData} deleteButton={true} editButton={true} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </Box>
  </Container>
  )
}

export default IndexContainer