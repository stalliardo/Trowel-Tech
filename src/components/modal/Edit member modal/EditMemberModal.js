import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, TextField } from '@mui/material';
import SelectMenu from '../../selectMenu/SelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { editMember } from '../../../features/gangInfo/gangInformationSlice';
import CircularIndicator from '../../loadingIndicator/CircularIndicator';

const EditMemberModal = (props) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [showErrorText, setshowErrorText] = useState(false);

    const dispatch = useDispatch();

    const skillMenuItems = ["Bricklayer", "Hod Carrier"];
    const memberTypeOptions = ["Split", "Day Rate"];

    const isLoading = useSelector((state) => state.gangInformation.isEditing);

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

        const data = {...formData, gangId: props.userDoc.gangId};

        dispatch(editMember(data)).unwrap().then(() => {
            setOpen(false);
        }).catch((error) => {
            setshowErrorText(true);
            setTimeout(() => {
                setshowErrorText(false);
            }, 3000)
        })
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: "70%", md: "40%" },
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                    minHeight: "400px"
                }}>
                    <Typography variant="h4" align="center">Edit Member</Typography>

                    {isLoading ? <CircularIndicator style={{ mt: "20px" }} /> :
                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <Grid container spacing={2} mt="10px">
                                <Grid item xs={12} sm={6}>
                                    <TextField name="firstName" label="First Name" defaultValue={formData.firstName} required onChange={handleChange} autoFocus fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="lastName" label="Last Name" defaultValue={formData.lastName} required onChange={handleChange} fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectMenu
                                        value={formData.memberType}
                                        label="Member Type"
                                        name="memberType"
                                        menuItems={memberTypeOptions}
                                        handleChange={handleChange}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="dayRate" label="Day Rate" defaultValue={formData.dayRate} required onChange={handleChange} fullWidth />
                                </Grid>

                                <Grid item xs={12}>
                                    <SelectMenu
                                        value={formData.skill}
                                        label="Skill"
                                        name="skill"
                                        menuItems={skillMenuItems}
                                        handleChange={handleChange}
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                            {showErrorText ? <Typography color="error.dark" fontSize="20px" mt="1rem" mb="0">There was a problem editing the user "{props.rowData.firstName}". Please try again.</Typography> : null}
                            <Grid container sx={{ justifyContent: "space-between" }}>
                                <Button variant='contained' type="submit" sx={{ mt: "20px", width: { xs: "100%", md: "40%" } }}>Save</Button>
                                <Button variant='contained' color="warning" sx={{ mt: "20px", width: { xs: "100%", md: "40%" } }} onClick={handleCancelClicked}>Cancel</Button>
                            </Grid>
                        </form>
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default EditMemberModal;