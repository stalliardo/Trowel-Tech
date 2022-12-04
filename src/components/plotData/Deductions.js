import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GridLabel from '../gridItems/GridLabel';
import SelectMenu from '../selectMenu/SelectMenu';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { showToast } from '../../features/notifications/notificationSlice';
import { getData } from '../../features/gangInfo/gangInformationSlice';
import CircularIndicator from '../loadingIndicator/CircularIndicator';
import { addDeduction } from '../../services/database/liftDeductions';
import { addToDeductionArray } from '../../features/financials/financialsSlice';

const extractFullName = (membersArray) => {
  if(membersArray.length) {
    return membersArray.map((member) => {
      return `${member.firstName} ${member.lastName}`;
    });
  }
  return null;
}

const DeductionRow = ({ title, memberValue, members, hoursValue, handleChange, handleClick, buttonDisabled }) => {
  return (
    <Grid container sx={{ mt: "20px" }}>
      <Typography variant='h5' color="text.title.main">{title}</Typography>
      <Grid container sx={{}}>
        <Grid item xs={12} md={5} display="flex" sx={{ alignItems: "center" }}>
          <GridLabel text="Member" />
          <SelectMenu
            value={memberValue}
            name="member"
            menuItems={extractFullName(members)}
            handleChange={handleChange}
            styles={{ width: "60%", ml: "20px" }}
          />
        </Grid>

        <Grid item xs={12} md={5} display="flex" sx={{ alignItems: "center" }}>
          <GridLabel text="Hours" />
          <TextField name="hours" value={hoursValue} type="number" InputProps={{inputProps: { min: 0 }}} required={true} onChange={handleChange} sx={{ ml: "20px", width: "60%" }} />
        </Grid>

        <Grid item xs={12} md={2} display="flex" sx={{ alignItems: "center" }}>
          <Button variant='contained' onClick={handleClick} disabled={buttonDisabled} sx={{width: "100%"}}>Save</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Deductions = () => {
  const user = useSelector(state => state.user.currentUser);
  const membersFromStore = useSelector(state => state.gangInformation.members);

  const [selectedMember, setSelectedMember] = useState("");
  const [members, setMembers] = useState([]);
  const [hours, setHours] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLift, setSelectedLift] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const plotData = useSelector(state => state.plotData.singlePlotData);

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
      case "member": {
        setSelectedMember(e.target.value);
        break;
      }
      case "hours": {
        setHours(e.target.value);
        break;
      }
      default: { }
    }
  }

  const handleSave = () => {
    const member = members.find(m => m.firstName + " " + m.lastName === selectedMember);

    const data = {
      member: member.firstName + " " + member.lastName,
      hourlyRate: parseInt(member.dayRate) / 8,
      hours,
      lift: selectedLift,
      plotId: plotData.id
    };

    addDeduction(data).then((response) => {
      dispatch(addToDeductionArray({...data, id: response.id}));
      setIsLoading(true);
      dispatch(showToast({ message: `Deduction for ${member.firstName} saved successfully!`, duration: 3000, alertType: "success" }));
      setSelectedMember("");
      setHours("");
    }).catch((e) => {
      dispatch(showToast({ message: `Deduction for ${member.firstName} failed! Please try again`, duration: 3000, alertType: "error" }));
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if (!membersFromStore.length) {
      setIsLoading(true);
      if (user && user.gangId) {
        dispatch(getData(user.gangId)).unwrap().then((data) => {
          setMembers(data.members);
          setIsLoading(false);
        });
      }
    } else {
      setMembers(membersFromStore);
    }
  }, [selectedLift]);

  useEffect(() => {
    setButtonDisabled(selectedMember.length === 0 || parseInt(hours) <= 0);
  }, [selectedMember, hours]);

  return (
    isLoading ? <CircularIndicator /> : <form onSubmit={handleSubmit}>
      <Grid container sx={{ pb: "20px" }}>
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

          {selectedLift && <DeductionRow
            title={selectedLift}
            memberValue={selectedMember}
            members={members}
            hoursValue={hours}
            handleChange={handleChange}
            handleClick={handleSave}
            buttonDisabled={buttonDisabled}
          />}
        </Grid>
      </Grid>
    </form>
  )
}

export default Deductions;