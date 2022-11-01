import React, { useState } from 'react'

import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GridLabel from '../gridItems/GridLabel';
import SelectMenu from '../selectMenu/SelectMenu';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { showToast } from '../../features/notifications/notificationSlice';

const DeductionRow = ({ title, memberValue, memberOptions, hoursValue, handleChange, handleClick }) => {
  return (
    <Grid container sx={{ mt: "20px" }}>
      <Typography variant='h5' color="text.title.main">{title}</Typography>
      <Grid container sx={{}}>
        <Grid item xs={12} md={5} display="flex" sx={{ alignItems: "center" }}>
          <GridLabel text="Member" />
          <SelectMenu
            value={memberValue}

            name="member"
            menuItems={memberOptions}
            handleChange={handleChange}
            styles={{ width: "60%", ml: "20px" }}
          />
        </Grid>

        <Grid item xs={12} md={5} display="flex" sx={{ alignItems: "center" }}>
          <GridLabel text="Hours" />
          <TextField name="hours" value={hoursValue} type="number" required={true} onChange={handleChange} sx={{ ml: "20px",  width: "60%"}} />
        </Grid>

        <Grid item xs={12} md={2} display="flex" sx={{ alignItems: "center" }}>
          <Button variant='contained' onClick={handleClick}>Save</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Deductions = () => {

  const [member, setMember] = useState("");
  const memberNames = ["Darren", "Chris", "Jamie"];
  const [hours, setHours] = useState();
  const [selectedLift, setSelectedLift] = useState("");
  const liftOptions = ["1st Lift", "2nd Lift", "3rd Lift", "4th Lift", "Gables", "Other"];

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case "selectedLift": {
        setSelectedLift(e.target.value);
        break;
      }
      default:{}
    }
  }

  const handleSave = () => {
    dispatch(showToast({message: "Deduction saved successfully!"}))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{pb: "20px"}}>
        <Grid container >

          <Grid item xs={12} display="flex" sx={{ alignItems: "center", justifyContent: "center" }}>
            <GridLabel text="Select Lift" />
            <SelectMenu
              value={selectedLift}
              name="selectedLift"
              menuItems={liftOptions}
              handleChange={handleChange}
              styles={{ width: "30%", ml: "20px" }}
            />
          </Grid>

          {selectedLift && <DeductionRow title={selectedLift} memberValue={member} memberOptions={memberNames} hoursValue={hours} handleChange={handleChange} handleClick={handleSave}/>}
        </Grid>
      </Grid>
    </form>
  )
}

export default Deductions;

// TODOS

  // Get all the members from the gangnformation doc
  // Load them into the store
  // Then set those as options in the memberNames array

  // Checks for valid hours entered so it doesn't fuck up the calculations