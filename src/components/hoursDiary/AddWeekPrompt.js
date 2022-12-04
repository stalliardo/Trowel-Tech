import React from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const AddWeekPrompt = (props) => {
  return (
    <Box textAlign="left">
        <Typography variant='subtitle'>It looks like you haven't created an hours diary yet. The hours diary will be displayed here when hours have been saved.</Typography>
        <br />
        <br />
        <Button variant='contained' onClick={props.addWeekClicked}>Add Hours</Button>
    </Box>
  )
}

export default AddWeekPrompt