
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import React, { useEffect } from 'react'
import OverviewCard from './OverviewCard'

import { useSelector } from 'react-redux';

const OverViewItem = ({header, value, hasColor}) => {
    return <Grid item sx={{ mb: { xs: "20px", md: "0px" } }}>
                <OverviewCard header={header} value={value} variantSmall="h6" variantLarge="h4" hasColor={hasColor}/>
            </Grid>
}

const FinancialOverview = ({overviewText, totalDeductions, currentFinancials, liftTotal}) => {

    return (
        <Box sx={{ padding: "1px 20px 30px" }}>
            <Typography textAlign="left" variant='h5' mb="15px">{overviewText}</Typography>
            <Grid container justifyContent="space-between" px="30px" sx={{ flexDirection: { xs: "column", md: "row" }, }}>
                <OverViewItem header="Lift Total" value={liftTotal}/>
                <OverViewItem header="Total Deductions" value={totalDeductions}/>
                <OverViewItem header="Current Financials" value={currentFinancials} hasColor={true}/>
            </Grid>
        </Box>
    )
}

export default FinancialOverview;

// Get all the deductions from the db for the given plot
// Store in the state
// When clicking selectedLift filter the data via lift
// calculate sums ie, total lift price - all deductions.
// will also need the totals stored in state so other comps can access it. Like the main overview container and the index page table