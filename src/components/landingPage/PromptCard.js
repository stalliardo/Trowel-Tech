import React from 'react'
import { Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button';



const PromptCard = (props) => {
    return (
        <Grid item md={3} sx={{ backgroundColor: props.backgroundColor, borderRadius: "10px", padding: "4px 20px 20px", marginTop: "20px" }}>
            <Typography variant='h6' fontWeight="500" textAlign="left" sx={{ paddingTop: "2rem" }}>{props.title}</Typography>
            <Typography textAlign="left" variant="subtitle1" fontSize="16px" mt="20px">{props.text}</Typography>
            <Button variant='contained' sx={{ mt: "20px" }} onClick={props.clickHandler}>{props.buttonText}</Button>
        </Grid>
    )
}

export default PromptCard