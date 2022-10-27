import { Box, Typography } from '@mui/material'
import React from 'react'

const OverviewCard = ({header, value}) => {
  return (
    <Box sx={{ height: "90px", textAlign: "left"}}>
        <Typography variant='h6' color="text.subText">{header}</Typography>
        <Typography variant='h2' color="text.title.main">{value}</Typography>
    </Box>
  )
}

export default OverviewCard