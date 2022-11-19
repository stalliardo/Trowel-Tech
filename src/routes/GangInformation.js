import { Avatar, Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'

import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SelectMenu from '../components/selectMenu/SelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getData, createGangInformationDocument, updateGangInformationDocument, deleteMember, setIsLoading } from '../features/gangInfo/gangInformationSlice';

import { setGangId } from '../features/user/userSlice';

import ExtendableTable from '../components/table/ExtendableTable';
import PageTitle from '../components/elements/PageTitle';

import EditMemberModal from '../components/modal/Edit member modal/EditMemberModal';
import ExtendableModal from '../components/modal/extendableModal/ExtendableModal';
import AddMemberModal from '../components/modal/AddMemberModal';

const GangInformation = () => {

    const [tableData, setTableData] = useState({
        head: ["Name", "Member Type", "Day Rate", "Skill", "Actions"],
        rows: []
    })

    const dispatch = useDispatch();

    const userDoc = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (userDoc && userDoc.gangId) {
            dispatch(getData(userDoc.gangId)).unwrap().catch((e) => {
                // TODO
            });
        } else {
            dispatch(setIsLoading(false));
        }
    }, [userDoc])

    const gangData = useSelector((state) => state.gangInformation);
    const isLoading = useSelector((state) => state.gangInformation.isLoading)

    const skillMenuItems = ["Bricklayer", "Hod Carrier"];
    const memberTypeOptions = ["Split", "Day Rate"];

    const initialFormData = { firstName: "", lastName: "", memberType: "", dayRate: "0", skill: "" };

    const [formData, setFormData] = useState(initialFormData);
    const [showEditModal, setShowEditModal] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        if (gangData.members.length) {
            let data = [];

            gangData.members.forEach((member) => {                
                data.push({
                    name: member.firstName + " " + member.lastName,
                    memberType: member.memberType,
                    dayRate: member.dayRate,
                    skill: member.skill,
                    id: member.id
                })
            });

            setTableData({head: tableData.head, rows: data})

            tableData.rows = data;            
        }
    }, [gangData.members])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleEditMemberClicked = (row) => {
        setShowEditModal(true);
        setModalData(row);
    }

    const handleModalClosed = () => {
        setShowEditModal(false)
    }

    const handleDeleteMember = (row) => {
        const data = { row, id: userDoc.gangId || row.id }
        dispatch(deleteMember(data)).unwrap().then(() => {
        }).catch((e) => {
            // TODO
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('handle called');
        

        if (userDoc.gangId) {
            dispatch(updateGangInformationDocument({ formData, gangId: userDoc.gangId })).unwrap().then((response) => {
            }).catch((e) => {
                // TODO
            })
        } else {
            dispatch(createGangInformationDocument({ ...formData, creatorId: userDoc.id })).unwrap().then((response) => {
                dispatch(setGangId(response.id))
            }).catch((e) => {
                // TODO
            })
        }
    }

    

    return (
        isLoading ? <Box sx={{ width: "fit-content", margin: "auto", mt: "100px" }}><CircularProgress size={70} /></Box> : <Container maxWidth="lg" sx={{ mt: "30px", pt: "30px", pb: "100px" }}>
            <Container sx={{ mt: "20px" }}>
                
                {
                    tableData.rows.length ?
                        <>
                            <Typography variant='h5' textAlign="left" >Members:</Typography>
                            <Box sx={{ width: "100%" }}>
                                <ExtendableTable data={tableData} deleteButton={true} editButton={true} handleDelete={handleDeleteMember} handleEdit={handleEditMemberClicked} />
                            </Box>
                        </>
                        :
                        <>
                            <PageTitle title="Add Gang Members" />
                            <br/>
                            <Typography variant='p' color="text.subText">
                                You haven't added any gang members. Once added you will be able to view, edit and delete a member. There data will then be used
                                in the other sections of the site, such as lift deductions, hours diary etc.
                            </Typography>
                        </>
                }

                {showEditModal ?
                    <EditMemberModal
                        modalOpened={showEditModal}
                        modalClosed={handleModalClosed}
                        rowData={modalData}
                        gangData={gangData}
                    />
                    : null
                }

                <Container disableGutters maxWidth="sm" sx={{ mt: "30px" }}>
                    <Paper elevation={6} sx={{ padding: "30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar sx={{ backgroundColor: "red", }}>
                            <GroupAddOutlinedIcon />
                        </Avatar>
                        <Typography variant='h5' sx={{ mt: "10px", mb: "20px" }}>
                            Add Members
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={6}>
                                    <TextField name='firstName' label="First Name" onChange={handleChange} autoFocus fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name='lastName' label="Last Name" onChange={handleChange} fullWidth />
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
                                    <TextField name='dayRate' label="Day Rate £" onChange={handleChange} fullWidth type="number" />
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

                            <Button type='submit' variant='contained' fullWidth sx={{ mt: "20px" }}>
                                {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Add Member"}
                            </Button>
                        </form>
                    </Paper>
                </Container>

                <ExtendableModal title="Add Member" >
                    <AddMemberModal />
                </ExtendableModal>
            </Container>
        </Container>
    )
}

export default GangInformation;

// TODO
// The save button should be disabled if any of the fields are empty
// The add member form would look better as a modal