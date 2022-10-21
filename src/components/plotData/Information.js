import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import SelectMenu from '../selectMenu/SelectMenu';

const plotTypeOptions = ["House", "Flats", "Garage"];

const GridItem = ({ name, text, autoFocus, isSelect }) => {
  // TODO -> Select menu comp for stauts and plot type
  return (
    <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="space-between" mt="20px">
      <Typography component="label" sx={{ fontSize: "18px" }}>{text}</Typography>
      {!isSelect && <TextField name={name} autoFocus={autoFocus} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />}
      {
        isSelect && <SelectMenu
          // value={formData.memberType}
          label={text}
          name={name}
          menuItems={plotTypeOptions}
          handleChange={handleChange}
          styles={{ width: "60%", mr: "20px" }}
        />
      }
    </Grid>
  )
}

const handleChange = (e) => {
  console.log("e.target.value = ", e.target.value);
}


const Information = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

  }


  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ justifyContent: "space-between" }}>
        <GridItem name="plotNumber" text="Plot Number(s)" autoFocus={true} />
        <GridItem name="totalPrice" text="Total Price" />
        <GridItem name="plotType" text="Plot Type" isSelect={true} />
        <GridItem name="currentStatus" text="Current Status" isSelect={true} />
        <GridItem name="numberOfStories" text="NumberOfStories" />

        <Grid item xs={12} sm={2}>
          <Button variant="contained" type='submit' fullWidth sx={{ mt: "30px" }}>Save</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Information