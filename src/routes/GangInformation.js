import React from 'react'

import Box from '@mui/material/Box'

import MembersContainer from '../components/gangInformation/MembersContainer'
import InviteMemberForm from '../components/gangInformation/InviteMemberForm'

const GangInformation = () => {
  return (
    <Box>
        <MembersContainer />

        {/* TODO  add the invite comp below*/}
        <InviteMemberForm />
    </Box>
  )
}

export default GangInformation