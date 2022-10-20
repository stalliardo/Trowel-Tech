import { Container } from '@mui/material'
import React from 'react'

import NoDataPrompt from '../../components/plotData/NoDataPrompt'

const Home = (props) => {

  return (
      props.data.length ? <Container>Data found</Container> : <NoDataPrompt />
  )
}

export default Home