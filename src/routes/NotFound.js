import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const NotFound = () => {
  return (
    <Container sx={{mt: "100px"}}>
        <Typography variant='h3' color="primary">Oops! That page isn't available.</Typography>
    </Container>
  )
}

export default NotFound