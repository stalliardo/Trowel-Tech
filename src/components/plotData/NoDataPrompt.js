import { Container, Typography } from '@mui/material'
import React from 'react'
import LinkButton from '../button/LinkButton'
import PageTitle from '../elements/PageTitle'


const NoDataPrompt = () => {

  return (
    <Container maxWidth="md" sx={{ textAlign: "left", mt: "30px", display: "flex", flexDirection: "column" }}>
      <PageTitle title="Plot Data" />
      <Typography variant='p' color="text.subText">Welcome to the plot data section of the site. Here you can create plots
        so you can easily record price and progress information. Start by creating your first plot.
      </Typography>
        <LinkButton to="edit" text="Create Plot" style={{mt: "30px"}}/>
    </Container>
  )
}

export default NoDataPrompt