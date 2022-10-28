import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SelectMenu from '../selectMenu/SelectMenu';

import { BREAKDOWN_METHOD } from '../../constants/plotData';
import { useDispatch, useSelector } from 'react-redux';
import { addInformation } from '../../features/plotData/plotDataSlice';

import CircularIndicator from '../loadingIndicator/CircularIndicator'

const gridItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: "20px"
}

const GridLabel = ({ text }) => {
  return <Typography component="label" sx={{ fontSize: "18px" }}>{text}</Typography>
}

const Breakdown = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const plotData = useSelector(state => state.plotData.singlePlotData);
  const isLoading = useSelector(state => state.plotData.isLoading);

  const initialFormData = { firstLift: "", secondLift: "", thirdLift: "", fourthLift: "", gables: "", other: "", breakdownMethod: "" }

  const [formData, setFormData] = useState(plotData.information || initialFormData);
  const [buttonDisabled, setButtonDisabled] = useState(true); // Will need to set this to false if the formData is present TODO

  useEffect(() => {
    if (Object.keys(params).length && !plotData) {
      // navigate("/plot-data"); TODO reinstate 
    }

    if (!Object.keys(params).length && plotData) {
      setFormData(initialFormData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    //TODO need to determine if creating or editing, do this via the query param
    e.preventDefault();

    dispatch(addInformation({plotData, formData})).unwrap().then((response) => {
      console.log("response from addInformation = ", response);
    })
  }

  const buttonDisabledHandler = () => {
    let disabled = true;

    Object.keys(formData).forEach((key) => {
      if(formData[key] !== "") {
        disabled = false;
      } 
    });

    setButtonDisabled(disabled);
  }

  useEffect(() => {
    buttonDisabledHandler();
    console.log("use effect called");
  }, [formData])

  return (
    isLoading ? <CircularIndicator /> : <form onSubmit={handleSubmit}>
      <Grid container sx={{ justifyContent: "space-between" }}>

        <Grid container>
          <Grid item xs={12} sm={6} sx={gridItemStyle}>
            <GridLabel text="Breakdown method" />
            <SelectMenu
              value={formData.breakdownMethod}
              label="Breakdown Method"
              name="breakdownMethod"
              menuItems={BREAKDOWN_METHOD}
              handleChange={handleChange}
              styles={{ width: "60%", mr: "20px" }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle} >
          <GridLabel text="First Lift" />
          <TextField name="firstLift" autoFocus value={formData.firstLift} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Second Lift" />
          <TextField name="secondLift" autoFocus value={formData.secondLift} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Third Lift" />
          <TextField name="thirdLift" autoFocus value={formData.thirdLift} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Fourth Lift" />
          <TextField name="fourthLift" autoFocus value={formData.fourthLift} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Gables" />
          <TextField name="gables" autoFocus value={formData.gables} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Other" />
          <TextField name="other" autoFocus value={formData.other} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={3} sx={{ mr: "20px" }}>
          <Button variant="contained" type='submit' fullWidth sx={{ mt: "20px" }} disabled={buttonDisabled}>Save</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Breakdown;