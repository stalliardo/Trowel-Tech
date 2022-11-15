
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import React from 'react'
import OverviewCard from './OverviewCard'

import { useSelector } from 'react-redux';

const OverViewItem = ({header, value}) => {
    return <Grid item sx={{ mb: { xs: "20px", md: "0px" } }}>
                <OverviewCard header={header} value={value} variantSmall="h6" variantLarge="h4"/>
            </Grid>
}

const FinancialOverview = ({overviewText}) => {

    const data = useSelector(state => state.plotData.singlePlotData); // Change

    return (
        <Box sx={{ mt: "20px", padding: "1px 20px 30px" }}>
            <Typography textAlign="left" variant='h5' mb="15px">{overviewText}</Typography>
            <Grid container justifyContent="space-between" px="30px" sx={{ flexDirection: { xs: "column", md: "row" }, }}>
                <OverViewItem header="Total Price" value={data ? `£${data.totalPrice}` : "N/A"}/>
                <OverViewItem header="Current Financials" value="TODO"/>
                <OverViewItem header="Status" value={data ? `${data.currentStatus}` : "N/A"}/>
            </Grid>
        </Box>
    )
}

export default FinancialOverview