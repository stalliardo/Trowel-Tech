import React from 'react'

import { Container, Typography } from '@mui/material'

import Filter from '../../components/plotData/Filter'
import ExtendableTable from '../table/ExtendableTable'
import { Box } from '@mui/system';

const tableData = {
    head: ["Plot Number", "Type", "Status", "Total Price", "Financials", "Actions"],
    rows: [
        {pn: "25/26", type: "House", status: "In Progress", totalPrice: "15,000", Financials: "+£403"},
        {pn: "25/26", type: "House", status: "In Progress", totalPrice: "15,000", Financials: "+£403"},
        {pn: "25/26", type: "House", status: "In Progress", totalPrice: "15,000", Financials: "+£403"},
        {pn: "25/26", type: "House", status: "In Progress", totalPrice: "15,000", Financials: "+£403"}
    ],
}

const IndexContainer = () => {

    // If data is passed in, i will have to format it so that it can be used within the table.
    // Will need the id though, which isnt currently being returned


  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "backDrop.dark", height: "100vh", pt: "20px", mt: "20px" }}>
        <Typography textAlign="left" variant='h5' mb="15px">Plots</Typography>
        <Filter />
        <Box component="div" sx={{mt: "40px"}}>
            <ExtendableTable data={tableData} deleteButton={true} editButton={true}/>
        </Box>
  </Container>
  )
}

export default IndexContainer