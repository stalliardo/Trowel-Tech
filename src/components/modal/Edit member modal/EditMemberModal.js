import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from "react";
import { Grid, TextField } from '@mui/material';
import SelectMenu from '../../selectMenu/SelectMenu';

const EditMemberModal = (props) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});
    
    const skillMenuItems = ["Bricklayer", "Hod Carrier"];
    const memberTypeOptions = ["Split", "Day Rate"];

    useEffect(() => {
        setOpen(props.modalOpened);
        setFormData(props.rowData);
        
    }, [props.modalOpened, props.rowData])

    const handleClose = () => {
        setOpen(false);
        props.modalClosed()
    }

    const handleCancelClicked = () => {
        setOpen(false);
        props.modalClosed()
    }
    
    const handleChange = (e) => {       
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Will need to filter out the edited row from the array in gangData
        // Then push in the new row

        const filteredMemebers = props.gangData.members.filter(member => member.id !== props.rowData.id);
        console.log("member being edited = ", filteredMemebers);

        // Now push the edited row into the array

        filteredMemebers.push(formData);

        console.log("filteedMembers after push = ", filteredMemebers);

        // now dispatch this to update the record in the db, then set the state to update the table...

        console.log("on submit called. FormData - ", formData);

    }
      
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
                            <TextField name="firstName" label="First Name" defaultValue={formData.firstName} onChange={handleChange} autoFocus fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="lastName" label="Last Name" defaultValue={formData.lastName} onChange={handleChange} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectMenu
                                value={formData.memberType}
                                label="Member Type"
                                name="memberType"
                                menuItems={memberTypeOptions}
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="dayRate" label="Day Rate" defaultValue={formData.dayRate} onChange={handleChange} fullWidth/>
                        </Grid>

                        <Grid item xs={12}>
                            <SelectMenu
                                value={formData.skill}
                                label="Skill"
                                name="skill"
                                menuItems={skillMenuItems}
                                handleChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{justifyContent: "space-between"}}>
                        <Button variant='contained' type="submit" sx={{mt: "20px", width: {xs: "100%", md: "40%"}}}>Save</Button>
                        <Button variant='contained' color="warning" sx={{mt: "20px", width: {xs: "100%", md: "40%"}}} onClick={handleCancelClicked}>Cancel</Button>
                    </Grid>
                </form>
            </Box>
        </Modal>
    </div>
    )
}

export default EditMemberModal;

// need to disable the button if no changes detected