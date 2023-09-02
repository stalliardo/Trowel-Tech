import React from 'react'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const UnderConstruction = () => {
    return (
        <Container sx={{ mt: "100px" }}>
            <Typography variant='h3' color="primary">This page is currently under constuction. Please come back soon.</Typography>
        </Container>
    )
}

export default UnderConstruction