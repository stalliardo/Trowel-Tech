import { Box } from '@mui/material'
import React from 'react'
import TabItem from './TabItem'

const TabContainer = (props) => {
    return (
        <Box sx={{ height: "50px", borderBottom: "1px solid grey", display: "flex", alignItems: "center", overflowX: {xs: "scroll", md: "hidden"} }}>
            {
                props.navItems.map((item, index) => {
                    return <TabItem to={item.to} text={item.text} key={index} requiresQueryParam={item.requiresQueryParam} />
                })
            }
        </Box>
    )
}

export default TabContainer