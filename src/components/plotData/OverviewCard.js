import { Box, Typography } from '@mui/material'
import React from 'react'

const loadColor = (value) => {
  if(value > 0) return "lightgreen";
  if(value === 0) return "text.title.main";
  if(value < 0) return "red";
}

const loadSymbol = (value, hasColor) => {
  if(hasColor) {
    if(value > 0) return "+";
    if(value < 0) return "-";
  }
  return "";
}

const OverviewCard = ({header, value, variantSmall, variantLarge, hasColor, showPoundSymbol=true}) => {

  return (
    <Box sx={{ height: {xs: "30px", sm: "90px"}, textAlign: "left"}}>
        <Typography variant={variantSmall} color="text.subText" sx={{fontSize: {xs: "10px", md: "30px"}}}>{header}</Typography>
        <Typography variant={variantLarge}
          color={hasColor ? loadColor(value) : "text.title.main"}
          sx={{fontSize: {xs: "20px", md: "40px"}}}
        >
          {`${loadSymbol(value, hasColor)}${showPoundSymbol ? `£` : ""}${value < 0 ? value * -1 : value}`}
        </Typography>
    </Box>
  )
}

export default OverviewCard
