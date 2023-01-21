import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

const InvitationModal = ({invite}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCancelClicked = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                   <Typography>{`${invite.sendersName} want's you to join their gang. What would you like to do?`}</Typography>
                </Grid>
    
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant='contained' type="submit" sx={{ mt: "20px", width: { xs: "100%", md: "30%" } }}>{isLoading ? <CircularProgress style={{ color: "white" }} /> : "Accept"}</Button>
                    <Button variant='contained' color="error" sx={{ mt: "20px", width: { xs: "100%", md: "30%" } }} onClick={handleCancelClicked}>Decline</Button>
                    <Button variant='contained' color="warning" sx={{ mt: "20px", width: { xs: "100%", md: "30%" } }} onClick={handleCancelClicked}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default InvitationModal