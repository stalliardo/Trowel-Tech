import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SelectMenu from '../selectMenu/SelectMenu';

import { PLOT_TYPES, STATUS } from '../../constants/plotData';
import { useDispatch, useSelector } from 'react-redux';
import { addPlotData, edit } from '../../features/plotData/plotDataSlice';

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

const Information = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const plotData = useSelector(state => state.plotData.singlePlotData);
  const user = useSelector(state => state.user.currentUser);
  const isLoading = useSelector(state => state.plotData.isLoading);

  const initialFormData = { plotNumber: "", totalPrice: "", plotType: "House", currentStatus: "Uncategorized", numberOfStories: "" }

  const [formData, setFormData] = useState(plotData || initialFormData);
  const [buttonDisabled, setButtonDisabled] = useState(true); // Will need to set this to false if the formData is present TODO

  useEffect(() => {
    if (Object.keys(params).length && !plotData) {
      navigate("/plot-data");
    }

    if(!Object.keys(params).length && plotData) {
      setFormData(initialFormData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    //TODO need to determine if creating or editing, do this via the query param
    e.preventDefault();

    if (!Object.keys(params).length) {
      dispatch(addPlotData({ ...formData, gangId: user.gangId })).unwrap().then(() => {
        // is this actually desired behaviour a user will propbably then want to enter data for the other tabs????
        // TODO do i now load that data into the form?? how's this best handled?
        // navigate("/plot-data");
      }).catch((error) => {
        console.log("error Saving data. Error: ", error);
      })
    } else {
      dispatch(edit(formData)).then(() => {
        navigate("/plot-data")
      })
    }
  }

  const buttonDisabledHandler = () => {
    if (formData.plotNumber === "" || formData.totalPrice === "" || formData.numberOfStories === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }

  useEffect(() => {
    buttonDisabledHandler();
  }, [formData])

  return (
    isLoading ? <CircularIndicator /> : <form onSubmit={handleSubmit}>
      <Grid container sx={{ justifyContent: "space-between" }}>

        <Grid item xs={12} sm={6} sx={gridItemStyle} >
          <GridLabel text="Plot Number" />
          <TextField name="plotNumber" autoFocus value={formData.plotNumber} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Total Price" />
          <TextField name="totalPrice" type="number" value={formData.totalPrice} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Plot Type" />
          <SelectMenu
            value={formData.plotType}
            label="Plot Type"
            name="plotType"
            menuItems={PLOT_TYPES}
            handleChange={handleChange}
            styles={{ width: "60%", mr: "20px" }}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Current Status" />
          <SelectMenu
            value={formData.currentStatus}
            label="Current Status"
            name="currentStatus"
            menuItems={STATUS}
            handleChange={handleChange}
            styles={{ width: "60%", mr: "20px" }}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <GridLabel text="Number of Stories" />
          <TextField name="numberOfStories" type="number" value={formData.numberOfStories} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={3} sx={{ mr: "20px" }}>
          <Button variant="contained" type='submit' fullWidth sx={{ mt: "20px" }} disabled={buttonDisabled}>Save</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Information