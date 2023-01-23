import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { acceptInvitation, filterInvitations, setGangId } from '../../features/user/userSlice';
import { showToast } from '../../features/notifications/notificationSlice';
import { useNavigate } from 'react-router-dom';
import { declineInvite } from '../../services/database/user';

const InvitationModal = ({invite, userDoc, handleAccept, handleDecline}) => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(acceptInvitation({inviteId: invite.id, userId: userDoc.id, gangId: invite.gangId })).unwrap().then(() => {
            dispatch(showToast({ message: "Invitation accepted!", duration: 2000, alertType: "success" }));
            handleAccept();
            dispatch(setGangId(invite.gangId));
            navigate("/members");
        }).catch((e) => {
            console.log("Error = ", e);
        })
    };

    const handleDeclineClicked = () => {
        declineInvite(invite.id).then(() => {
            handleDecline();
            dispatch(filterInvitations(invite.id));
        })
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                   <Typography>{`${invite.sendersName} want's you to join their gang. What would you like to do?`}</Typography>
                </Grid>
    
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant='contained' type="submit" sx={{ mt: "20px", width: { xs: "100%", md: "30%" } }}>{isLoading ? <CircularProgress style={{ color: "white" }} /> : "Accept"}</Button>
                    <Button variant='contained' color="error" sx={{ mt: "20px", width: { xs: "100%", md: "30%" } }} onClick={handleDeclineClicked}>Decline</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default InvitationModal;