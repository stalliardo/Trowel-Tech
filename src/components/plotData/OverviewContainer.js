import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import OverviewCard from './OverviewCard'

const OverViewItem = ({header, value}) => {
    return <Grid item sx={{ mb: { xs: "20px", md: "0px" } }}>
                <OverviewCard header={header} value={value} />
            </Grid>
}

const OverviewContainer = () => {
    return (
        <Paper maxWidth="lg" elevation={2} sx={{ backgroundColor:"white", mt: "0px", padding: "20px 20px 30px" }}>
            <Typography textAlign="left" variant='h5' mb="15px">Overview</Typography>
            <Grid container justifyContent="space-between" px="30px" sx={{ flexDirection: { xs: "column", md: "row" }, }}>
                <OverViewItem header="Total Price" value="£15000"/>
                <OverViewItem header="Current Financials" value="+£1000"/>
                <OverViewItem header="Staus" value="Uncatergorized"/>
            </Grid>
        </Paper>
    )
}

export default OverviewContainer