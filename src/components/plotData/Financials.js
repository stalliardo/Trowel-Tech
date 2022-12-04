import React, { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import GridLabel from '../gridItems/GridLabel'
import SelectMenu from '../selectMenu/SelectMenu'

import { LIFT_OPTIONS } from '../../constants/plotData'
import FinancialOverview from './FinancialOverview'
import ExtendableTable from '../table/ExtendableTable'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteOneDeduction, getAllDeductions } from '../../features/financials/financialsSlice'
import { calculateCurrentFinancialsForLift, extractTotalForLift, returnPriceFromLiftName } from '../../utils/deductionUtils'
import { Typography } from '@mui/material'

const menuOptions = LIFT_OPTIONS;

const tableData = {
    head: ["Member", "Hours", "Amount Deducted", "Actions"],
    rows: []
}

const Financials = () => {

    const [selectedLift, setSelectedLift] = useState(menuOptions[0]);
    const [totalDeductions, setTotalDeductions] = useState(0);
    const [currentFinancials, setCurrentFinancials] = useState(0);
    const [liftTotal, setLiftTotal] = useState(0);
    const [showTable, setShowTable] = useState(false);

    const deductionData = useSelector(state => state.financials.deductionData);
    const plotData = useSelector(state => state.plotData.singlePlotData) || null;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!plotData) {
            navigate("/plot-data");
        } else if (!deductionData.length && plotData) {
            dispatch(getAllDeductions(plotData.id)).catch((e) => {
                // TODO
            })
        } else {
            loadCalculations();
        }
    }, [])

    const loadCalculations = () => {
        const deductionTotal = extractTotalForLift(deductionData, selectedLift);

        setTotalDeductions(deductionTotal);
        setLiftTotal(returnPriceFromLiftName(plotData.information, selectedLift));
        setCurrentFinancials(calculateCurrentFinancialsForLift(deductionTotal, returnPriceFromLiftName(plotData.information, selectedLift)));
    }

    const filterDeductionArray = (deductions, selectedLift) => {
        return deductions.filter(element => element.lift === selectedLift);
    }

    const buildTableRows = (deductions) => {
        const rowData = [];
        deductions.forEach((element) => {
            const rowItem = { member: element.member, hours: element.hours, amountDeducted: element.hourlyRate * parseInt(element.hours), id: element.id };
            rowData.push(rowItem);
        })
        tableData.rows = rowData;
    }


    useEffect(() => {
        if (plotData && deductionData.length) loadCalculations();
    }, [deductionData])

    useEffect(() => {
        const deductionTotal = extractTotalForLift(deductionData, selectedLift);
        setTotalDeductions(deductionTotal);

        if (plotData && deductionData.length) loadCalculations();

        if (deductionData) {
            const filteredDeductionsArray = filterDeductionArray(deductionData, selectedLift);

            if (filteredDeductionsArray.length) {
                buildTableRows(filteredDeductionsArray);
                setShowTable(true);
            } else {
                setShowTable(false);
            }

        }
    }, [selectedLift, deductionData])

    const handleChange = (e) => {
        switch (e.target.name) {
            case "selectedLift": {
                setSelectedLift(e.target.value);

                break;
            }
        }
    }


    const handleDelete = (row) => {
        const confirmation = window.confirm(`Are you sure you want to delete the deduction for ${row.member}?`);
        if (confirmation) {
            dispatch(deleteOneDeduction({ deductionId: row.id, plotId: plotData.id })).unwrap().then((response) => {
                // TODO
            }).catch((e) => {
                // TODO
            })
        }
    }

    if (!deductionData.length){
        return (
            <Box mt="30px">
                <Typography variant="h4" textAlign="center" sx={{fontSize: {xs: "20px", md: "30px"}}}>Financial information cannot be displayed until deduction data has been entered!</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ width: "100%", height: "fit-content" }}>
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

            <Grid container>

                {
                    showTable ?
                        <>
                            <Typography variant='h5'>Deduction History</Typography>
                            <ExtendableTable data={tableData} deleteButton={true} handleDelete={handleDelete} />
                        </>
                        : null
                }
            </Grid>
        </Box>
    )
}

export default Financials;