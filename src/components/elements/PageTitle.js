import { Typography } from '@mui/material'
import React from 'react'

const PageTitle = ({title, textAlign}) => {
  return (
    <Typography variant='h3' textAlign={textAlign} color="text.title.main">{title}</Typography>
  )
}

export default PageTitle