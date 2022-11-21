import { Box, Button, CircularProgress, Typography } from '@mui/material'

import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData, deleteMember, setIsLoading } from '../features/gangInfo/gangInformationSlice';

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

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        console.log('use effect called for members');
        
        if (gangData.members.length) {
            console.log('members.length called');
            
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

            setTableData({ head: tableData.head, rows: data })

            tableData.rows = data;
        } else {
            tableData.rows = [];
        }
    }, [gangData.members])

    const handleEditMemberClicked = (row) => {
        setShowEditModal(true);
        setModalData(row);
    }

    const handleModalClosed = () => {
        setShowEditModal(false);
        setShowAddMemberModal(false);
    }

    const handleDeleteMember = (row) => {
        const data = { row, id: userDoc.gangId || row.id }
        const confirmation = window.confirm("Are you sure you want to delete this member?");
        if(confirmation) {
            dispatch(deleteMember(data)).unwrap().then(() => {
            }).catch((e) => {
                // TODO
            })
        }
    }

    return (
        isLoading ? <Box sx={{ width: "fit-content", margin: "auto", mt: "100px" }}><CircularProgress size={70} /></Box> : <Container maxWidth="lg" sx={{ mt: "30px", pt: "30px", pb: "100px" }}>
            <Container sx={{ mt: "20px" }} >

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
                            <br />
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant='p' color="text.subText">
                                    You haven't added any gang members. Once added you will be able to view, edit and delete a member. There data will then be used
                                    in the other sections of the site, such as lift deductions, hours diary etc.
                                </Typography>
                            </Box>
                        </>
                }
                <Button variant='contained' onClick={() => setShowAddMemberModal(true)} sx={{ mt: "20px", display: "block" }}>Add Member</Button>


                {showEditModal ?
                    <EditMemberModal
                        modalOpened={showEditModal}
                        modalClosed={handleModalClosed}
                        rowData={modalData}
                        gangData={gangData}
                    />
                    : null
                }

                {showAddMemberModal ?
                    <ExtendableModal title="Add Member" modalClosed={handleModalClosed}>
                        <AddMemberModal modalClosed={handleModalClosed} userDoc={userDoc} />
                    </ExtendableModal>
                    : null
                }

            </Container>
        </Container>
    )
}

export default GangInformation;

// TODO
// The save button should be disabled if any of the fields are empty
// The add member form would look better as a modal