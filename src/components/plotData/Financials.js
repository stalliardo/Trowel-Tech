import React, { useState } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import GridLabel from '../gridItems/GridLabel'
import SelectMenu from '../selectMenu/SelectMenu'

import { LIFT_OPTIONS } from '../../constants/plotData'
import FinancialOverview from './FinancialOverview'

const menuOptions = LIFT_OPTIONS;

const Financials = () => {

    const [selectedLift, setSelectedLift] = useState(menuOptions[0]);

    const handleChange = (e) => {
        switch (e.target.name) {
            case "selectedLift" : {
                setSelectedLift(e.target.value);
                break;
            }
        }
    }

    return (
        <Box sx={{ width: "100%", height: "450px" }}>
            <Grid container sx={{border: "1px solid red"}}>
                <Grid item xs={12} md={4}>
                    <GridLabel text="Select Lift" />
                    <SelectMenu
                        value={selectedLift}
                        name="selectedLift"
                        menuItems={menuOptions}
                        handleChange={handleChange}
                        styles={{ width: "100%" }}
                    />
                </Grid>
            </Grid>

            <Grid container sx={{mt: "20px", border: "1px solid green"}}>
                <Grid item xs={12} md={12}>
                   <FinancialOverview overviewText={`${selectedLift} Overview`}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Financials