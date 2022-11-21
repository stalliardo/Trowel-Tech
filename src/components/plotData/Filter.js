import React, { useState } from 'react'

import { Button, Grid, Paper, TextField } from '@mui/material'
import SelectMenu from '../selectMenu/SelectMenu'

import { STATUS, PLOT_TYPES } from '../../constants/plotData'
import { useDispatch } from 'react-redux'
import { clearFilters, filterPlots } from '../../features/plotData/plotDataSlice'

const Filter = () => {
  const dispatch = useDispatch();

  const defaultFilterOptions = { plotNumber: "", plotType: "", currentStatus: "" };
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);

  const handleChange = (e) => {
    setFilterOptions({ ...defaultFilterOptions, [e.target.name]: e.target.value });
  }

  const handleSearch = () => {
    let filterData;

    Object.keys(filterOptions).forEach((option) => {
      if (filterOptions[option] !== "") {
        filterData = { value: filterOptions[option], key: option }
      }
    });

    dispatch(filterPlots(filterData));
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
    setFilterOptions(defaultFilterOptions);
  }

  return (
    <Paper elevation={4}>
      <Grid container sx={{ padding: "10px 20px 30px", textAlign: "left", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Grid item xs={12} md={3}>
          <TextField label="Search Plot number" name="plotNumber" value={filterOptions.plotNumber} autoFocus sx={{ width: "200px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={3} sx={{ mt: "20px" }}>
          <SelectMenu
            value={filterOptions.plotType}
            label="Plot Type"
            name="plotType"
            menuItems={PLOT_TYPES}
            handleChange={handleChange}
            styles={{ width: "200px" }}
          />
        </Grid>

        <Grid item xs={12} sm={3} sx={{ mt: "20px" }}>
          <SelectMenu
            value={filterOptions.currentStatus}
            label="Status"
            name="currentStatus"
            menuItems={STATUS}
            handleChange={handleChange}
            styles={{ width: "200px" }}
          />
        </Grid>

        <Grid item xs={12} sm={2} display="flex">
          <Button variant='contained' sx={{ mt: "20px", mr: "20px" }} onClick={handleSearch}>Search</Button>
          <Button variant='contained' sx={{ mt: "20px" }} onClick={handleClearFilters}>Clear</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Filter