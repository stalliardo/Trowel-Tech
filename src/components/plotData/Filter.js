import React from 'react'

import { Button, Container, Grid, Paper, TextField } from '@mui/material'
import SelectMenu from '../selectMenu/SelectMenu'

import { STATUS, PLOT_TYPES } from '../../constants/plotData'

const Filter = () => {

  const handleChange = (e) => {

  }

  return (
    <Paper elevation={4}>
      <Grid container sx={{ padding: "10px 20px 30px", textAlign: "left", justifyContent: "space-between", alignItems: "flex-end"}}>
        <Grid item xs={12} md={3}>
          <TextField label="Search Plots" autoFocus sx={{ width: "200px" }} />
        </Grid>

        <Grid item xs={12} sm={3} sx={{mt: "20px"}}>
          <SelectMenu
            label="Category"
            name="category"
            menuItems={PLOT_TYPES}
            handleChange={handleChange}
            styles={{ width: "200px" }}
          />
        </Grid>

        <Grid item xs={12} sm={3} sx={{mt: "20px"}}>
          <SelectMenu
            label="Status"
            name="status"
            menuItems={STATUS}
            handleChange={handleChange}
            styles={{ width: "200px" }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button variant='contained' sx={{mt: "20px"}}>Search</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Filter