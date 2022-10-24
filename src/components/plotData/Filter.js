import React, { useState } from 'react'

import { Button, Grid, Paper, TextField } from '@mui/material'
import SelectMenu from '../selectMenu/SelectMenu'

import { STATUS, PLOT_TYPES } from '../../constants/plotData'

const Filter = () => {
  
  const [filterOptions, setFilterOptions] = useState({search: "", category: "", status: ""});

  const handleChange = (e) => {
    setFilterOptions({...filterOptions, [e.target.name]: e.target.value});
  }

  const handleSearch = () => {
    // TODO
    console.log("search called. FilterOptions = ", filterOptions);
  }

  return (
    <Paper elevation={4}>
      <Grid container sx={{ padding: "10px 20px 30px", textAlign: "left", justifyContent: "space-between", alignItems: "flex-end"}}>
        <Grid item xs={12} md={3}>
          <TextField label="Search Plots" name="search" autoFocus sx={{ width: "200px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={3} sx={{mt: "20px"}}>
          <SelectMenu
            value={filterOptions.category}
            label="Category"
            name="category"
            menuItems={PLOT_TYPES}
            handleChange={handleChange}
            styles={{ width: "200px" }}
          />
        </Grid>

        <Grid item xs={12} sm={3} sx={{mt: "20px"}}>
          <SelectMenu
            value={filterOptions.status}
            label="Status"
            name="status"
            menuItems={STATUS}
            handleChange={handleChange}
            styles={{ width: "200px" }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button variant='contained' sx={{mt: "20px"}} onClick={handleSearch}>Search</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Filter