import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import OverviewCard from './OverviewCard'

import { useSelector } from 'react-redux';

const OverViewItem = ({header, value, showPoundSymbol}) => {
    return <Grid item sx={{ mb: { xs: "20px", md: "0px" } }}>
                <OverviewCard header={header} value={value} variantSmall="h6" variantLarge="h3" showPoundSymbol={showPoundSymbol}/>
            </Grid>
}

const OverviewContainer = () => {

    const data = useSelector(state => state.plotData.singlePlotData);

    return (
        <Paper elevation={2} sx={{ backgroundColor:"white", mt: "20px", padding: "20px 20px 30px" }}>
            <Typography textAlign="left" variant='h5' mb="15px">Overview</Typography>
            <Grid container justifyContent="space-between" px="30px" sx={{ flexDirection: { xs: "column", md: "row" }, }}>
                <OverViewItem header="Total Price" value={data ? `${data.totalPrice}` : "N/A"}/>
                <OverViewItem header="Current Financials" value="TODO"/>
                <OverViewItem header="Status" value={data ? `${data.currentStatus}` : "N/A"} showPoundSymbol={false}/>
            </Grid>
        </Paper>
    )
}

export default OverviewContainer