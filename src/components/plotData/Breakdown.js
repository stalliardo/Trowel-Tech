import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SelectMenu from '../selectMenu/SelectMenu';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { BREAKDOWN_METHOD } from '../../constants/plotData';
import { useDispatch, useSelector } from 'react-redux';
import { addInformation } from '../../features/plotData/plotDataSlice';

import CircularIndicator from '../loadingIndicator/CircularIndicator'
import { calculateLiftPrices, checkTotalsMatch } from '../../services/plotData/liftBreakdown';

const gridItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: "20px"
}

const GridLabel = ({ text }) => {
  return <Typography component="label" sx={{ fontSize: "18px" }}>{text}</Typography>
}

const GridItem = ({ text, name, value, autofocus, handleChange, disabled }) => {
  return <Grid item xs={12} sm={6} sx={gridItemStyle} >
    <GridLabel text={text} />
    <TextField name={name} autoFocus={autofocus} type="number" disabled={disabled} value={value} sx={{ width: "60%", mr: "20px" }} onChange={handleChange} />
  </Grid>
}

const Breakdown = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();

  const plotData = useSelector(state => state.plotData.singlePlotData);
  const isLoading = useSelector(state => state.plotData.isLoading);

  const initialFormData = { firstLift: "", secondLift: "", thirdLift: "", fourthLift: "", gables: "", other: "", breakdownMethod: BREAKDOWN_METHOD[0] }

  const [formData, setFormData] = useState(plotData.information != undefined ? plotData.information : initialFormData);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (Object.keys(params).length && !plotData) {
      navigate("/plot-data");
    }

    if (!Object.keys(params).length && plotData) {
      setFormData(initialFormData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitForm = false;

    if (formData.breakdownMethod === "Manual Entry") {
      const result = checkTotalsMatch(parseInt(plotData.totalPrice), formData, "breakdownMethod");

      if (result !== "Values match") {
        setErrorText(result);
        submitForm = false;
      } else {
        setErrorText("");
        submitForm = true;
      }
    } else {
      setErrorText("");
      submitForm = true;
    }

    if (submitForm) {
      dispatch(addInformation({ plotData, formData })).unwrap().then((response) => {
        setFormData(response.formData);
      });
    }
  }

  const buttonDisabledHandler = () => {
    let disabled = false;

    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        disabled = true;
      }
    });

    setButtonDisabled(disabled);
  }

  useEffect(() => {
    if (plotData.information !== undefined) {
      setFormData(plotData);
    } else {
      setFormData(initialFormData);
    }

  }, [plotData])

  useEffect(() => {
    if (formData.breakdownMethod === "Calculated") {
      const result = calculateLiftPrices(parseInt(plotData.totalPrice));
      setFormData({ ...formData, firstLift: result.largeLift, secondLift: result.smallLift, thirdLift: result.largeLift, fourthLift: result.smallLift, gables: result.gablesPrice, other: 0 });
      setInputsDisabled(true);
      setErrorText("");
    } else {
      setInputsDisabled(false);
    }
  }, [formData])

  useEffect(() => {
    buttonDisabledHandler();
  }, [formData])

  return (
    isLoading ? <CircularIndicator /> : <form onSubmit={handleSubmit}>
      <Grid container sx={{ justifyContent: "space-between" }}>

        <Grid container>
          <Grid item xs={12} sm={6} sx={gridItemStyle}>
            <GridLabel text="Breakdown method" />
            <SelectMenu
              value={formData.breakdownMethod || BREAKDOWN_METHOD[0]}
              label="Breakdown Method"
              name="breakdownMethod"
              menuItems={BREAKDOWN_METHOD}
              handleChange={handleChange}
              styles={{ width: "60%", mr: "20px" }}
            />
          </Grid>
        </Grid>

        <GridItem text="First Lift" name="firstLift" autofocus={true} value={formData.firstLift} handleChange={handleChange} disabled={inputsDisabled} />
        <GridItem text="Second Lift" name="secondLift" autofocus={false} value={formData.secondLift} handleChange={handleChange} disabled={inputsDisabled} />
        <GridItem text="Third Lift" name="thirdLift" autofocus={false} value={formData.thirdLift} handleChange={handleChange} disabled={inputsDisabled} />
        <GridItem text="Fourth Lift" name="fourthLift" autofocus={false} value={formData.fourthLift} handleChange={handleChange} disabled={inputsDisabled} />
        <GridItem text="Gables" name="gables" autofocus={false} value={formData.gables} handleChange={handleChange} disabled={inputsDisabled} />
        <GridItem text="Other" name="other" autofocus={false} value={formData.other} handleChange={handleChange} disabled={inputsDisabled} />

        <Grid item xs={12} sm={3}>
          <Button variant="contained" type='submit' fullWidth sx={{ mt: "20px" }} disabled={buttonDisabled}>Save</Button>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box sx={{ mt: "14px", ml: "20px" }}>
            <Typography variant='p' color="error">{errorText}</Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default Breakdown;