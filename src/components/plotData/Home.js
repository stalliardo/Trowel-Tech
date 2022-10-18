import { Container } from '@mui/material'
import React from 'react'

import NoDataPrompt from './NoDataPrompt'

const Home = (props) => {

  return (

    
      !props.hasGangId ? <Container>No gang id</Container> : props.data.length ? <Container>Data found</Container> : <NoDataPrompt />
    
    // <div>
    //   <div>{props.data.length ? "data" : "No Data"}</div>
    //   <div>{props.hasGangId ? "found" : "No gangId found"}</div>
    // </div>
  )
}

export default Home