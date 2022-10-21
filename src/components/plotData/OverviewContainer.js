import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import OverviewCard from './OverviewCard'

const OverViewItem = ({header, value}) => {
    return <Grid item sx={{ mb: { xs: "20px", md: "0px" } }}>
                <OverviewCard header={header} value={value} />
            </Grid>
}

const OverviewContainer = () => {
    return (
        <Box maxWidth="lg" sx={{ border: "1px solid red", mt: "50px" }}>
            <Typography textAlign="left" variant='h5'>Overview</Typography>
            <Grid container justifyContent="space-between" px="30px" sx={{ flexDirection: { xs: "column", md: "row" }, }}>
                <OverViewItem header="Total Price" value="£15000"/>
                <OverViewItem header="Current Financials" value="+£1000"/>
                <OverViewItem header="Staus" value="Uncatergorized"/>
            </Grid>
        </Box>
    )
}

export default OverviewContainer