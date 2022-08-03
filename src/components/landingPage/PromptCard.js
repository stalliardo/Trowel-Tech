import React from 'react'
import { Grid, Icon, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/system';



const PromptCard = (props) => {
    return (
        <Grid item container md={3} sx={{
            backgroundColor: props.backgroundColor,
            borderRadius: "10px",
            padding: "12px 20px 20px",
            marginTop: "20px",
            flexDirection: "column",

        }}>
                <Container><Icon fontSize='large' sx={{ color: "white" }}>{props.icon}</Icon></Container>
                <Typography variant='h6' fontWeight="500" textAlign="center" sx={{ paddingTop: "1rem" }}>{props.title}</Typography>
                <Typography textAlign="left" variant="subtitle1" fontSize="16px" mt="20px">{props.text}</Typography>
                <Button variant='contained' sx={{ mt: "20px", marginTop: "auto" }} onClick={props.clickHandler}>{props.buttonText}</Button>
            
        </Grid>
    )
}

export default PromptCard