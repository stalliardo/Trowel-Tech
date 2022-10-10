import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from "react";
import { Grid, TextField } from '@mui/material';
import SelectMenu from '../../selectMenu/SelectMenu';

const EditMemberModal = () => {

    const [open, setOpen] = useState(false);

    const skillMenuItems = ["Bricklayer", "Hod Carrier"];
    const memberTypeOptions = ["Split", "Day Rate"];


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("on submit called");
    }

    const handleChange = (e) => {

    }
      
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {xs: "70%", md: "40%" },
                bgcolor: 'background.paper',
                border: '2px solid #000',
                borderRadius: "10px",
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h4" align="center">Edit Member</Typography>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Grid container spacing={2} mt="10px">
                        <Grid item xs={12} sm={6}>
                            <TextField name="firstName" label="First Name" onChange={handleChange} autoFocus fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="lastName" label="Last Name" onChange={handleChange} autoFocus fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectMenu
                                // value={data.memberType} TODO
                                label="Member Type"
                                name="memberType"
                                menuItems={memberTypeOptions}
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="dayRate" label="Day Rate" onChange={handleChange} autoFocus fullWidth/>
                        </Grid>

                        <Grid item xs={12}>
                            <SelectMenu
                                // value={data.memberType} TODO
                                label="Skill"
                                name="skill"
                                menuItems={skillMenuItems}
                                handleChange={handleChange}
                            />
                        </Grid>

                    </Grid>
                    <Button variant='contained' type="submit" sx={{mt: "20px", width: {xs: "80%", md: "40%"}}}>Save</Button>
                </form>
            </Box>
        </Modal>
    </div>
    )
}

export default EditMemberModal;


// Needs:

    // To display the same form fields as the add member form
    // Accept the data as an object passed in.
    // Will need the following data:
        // - firstName
        // - lastName
        // - memberType
        // - dayRate
        // - skill
        // - 
    
    // How will the data be updated within the array in the db?
         // Will need to edit the local copy of the whole members array
         // Then save that array in the DB

    // How will the data be udated in the DB?
        // Should the modal dispatch the action or return a callback and then the parent comp call the dispatch
        // Will call dispatch from the modal set a loading indicator then handle the response all within the modal

    // - Create a UpdateMembers() function in the gangInformation/service
    // - Send the edited array to that and overwrite the old members array
    
    // UPDATEMEMBERS IMPLEMENTATION............
    // dispatch the updateMemebers action from the modal
    // inside the gangInfo slice call the updateMembers function in the gangInfo/service file
    // overwrite the current members array with the edited one
    // onSuccess overwrite the local/state copy of the members array
    // This should then update the table to contain the edited values

    // 