import React, { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import GridLabel from '../gridItems/GridLabel'
import SelectMenu from '../selectMenu/SelectMenu'

import { LIFT_OPTIONS } from '../../constants/plotData'
import FinancialOverview from './FinancialOverview'

import { useDispatch, useSelector } from 'react-redux'
import { getAllDeductions } from '../../features/financials/financialsSlice'
import { calculateCurrentFinancialsForLift, extractTotalForLift, returnPriceFromLiftName } from '../../utils/deductionUtils'

const menuOptions = LIFT_OPTIONS;

const Financials = () => {

    const [selectedLift, setSelectedLift] = useState(menuOptions[0]);
    const [totalDeductions, setTotalDeductions] = useState(0);
    const [currentFinancials, setCurrentFinancials] = useState(0);
    const [liftTotal, setLiftTotal] = useState(0);

    const deductionData = useSelector(state => state.financials.deductionData);
    const plotData = useSelector(state => state.plotData.singlePlotData) || null;

    const dispatch = useDispatch();

    const loadCalculations = () => {
        const deductionTotal = extractTotalForLift(deductionData, selectedLift);

        setTotalDeductions(deductionTotal);
        setLiftTotal(returnPriceFromLiftName(plotData.information, selectedLift));
        setCurrentFinancials(calculateCurrentFinancialsForLift(deductionTotal, returnPriceFromLiftName(plotData.information, selectedLift)));
    }

    useEffect(() => {
        if (!deductionData.length && plotData) {
            dispatch(getAllDeductions(plotData.id)).catch((e) => {
                console.log("error getting deduction data. Error: ", e);
            })
        } else {
            loadCalculations();
        }
    }, [])

    useEffect(() => {
        loadCalculations();
    }, [deductionData])

    useEffect(() => {
        const deductionTotal = extractTotalForLift(deductionData, selectedLift);
        setTotalDeductions(deductionTotal);

        loadCalculations();
    }, [selectedLift])

    const handleChange = (e) => {
        switch (e.target.name) {
            case "selectedLift": {
                setSelectedLift(e.target.value);
                
                break;
            }
        }
    }

    return (
        <Box sx={{ width: "100%", height: "450px" }}>
            <Grid container>
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

            <Grid container sx={{ mt: "20px" }}>
                <Grid item xs={12} md={12}>
                    <FinancialOverview
                        overviewText={`${selectedLift} Overview `}
                        totalDeductions={totalDeductions}
                        currentFinancials={currentFinancials}
                        liftTotal={liftTotal}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Financials