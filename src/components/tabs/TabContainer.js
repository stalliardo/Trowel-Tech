import { Box } from '@mui/material'
import React from 'react'
import TabItem from './TabItem'

const navItems = [
    {
        to: "plot-information",
        text: "Plot Information"
    },
    {
        to: "lift-breakdown",
        text: "Lift Breakdown"
    },
    {
        to: "deductions",
        text: "Deductions"
    },
    {
        to: "financials",
        text: "Financials"
    },
]

const TabContainer = () => {
  return (
    <Box sx={{height: "50px", borderBottom: "1px solid grey", display: "flex", alignItems: "center"}}>
        {
            navItems.map((item, index) => {
                return <TabItem to={item.to} text={item.text} key={index}/>
            })
        }
    </Box>
  )
}

export default TabContainer