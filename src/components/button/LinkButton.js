import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton = ({to, text, style}) => {
  return (
    <Link to={to} style={{textDecoration: "none"}}>
          <Button variant='contained' sx={style}>
            {text}
          </Button>
        </Link>
  )
}

export default LinkButton