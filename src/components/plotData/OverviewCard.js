import { Box, Typography } from '@mui/material'
import React from 'react'

const OverviewCard = ({header, value, variantSmall, variantLarge}) => {
  return (
    <Box sx={{ height: "90px", textAlign: "left"}}>
        <Typography variant={variantSmall} color="text.subText">{header}</Typography>
        <Typography variant={variantLarge} color="text.title.main">{value}</Typography>
    </Box>
  )
}

export default OverviewCard