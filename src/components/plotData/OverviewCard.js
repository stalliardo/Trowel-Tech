import { Box, Typography } from '@mui/material'
import React from 'react'

const loadColor = (value) => {

  if(value < 0) {
    console.log("less than. before alteration =  ", value, " after = ", value * -1);
  }
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
    <Box sx={{ height: "90px", textAlign: "left"}}>
        <Typography variant={variantSmall} color="text.subText">{header}</Typography>
        <Typography variant={variantLarge}
          color={hasColor ? loadColor(value) : "text.title.main"}
        >
          {`${loadSymbol(value, hasColor)}${showPoundSymbol ? `£` : ""}${value < 0 ? value * -1 : value}`}
        </Typography>
    </Box>
  )
}

export default OverviewCard
