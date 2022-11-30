import { Button, Typography } from '@mui/material'
// import Button from '@mui/material/Button'
// import Button from '@mui/material/Button'
// import Button from '@mui/material/Button'

import React from 'react'

const AddWeekPrompt = (props) => {
  return (
    <>
        <Typography variant='subtitle'>It looks like you haven't created an hours diary yet. The hours diary will be displayed here when hours have been saved.</Typography>
        <br />
        <br />
        <Button variant='contained' onClick={props.addWeekClicked}>Add Hours</Button>
    </>
  )
}

export default AddWeekPrompt