import React from 'react'

import Box from '@mui/material/Box'

import MembersContainer from '../components/gangInformation/MembersContainer'
import InviteMemberForm from '../components/gangInformation/InviteMemberForm'
import PendingInvitations from '../components/gangInformation/PendingInvitations'

// Check for invitations in the store
// If none check the db
// if found pass down into pending invite
// if none at all don't display the pending invites comp

const GangInformation = () => {
  return (
    <Box>
        <MembersContainer />
        <InviteMemberForm />
        <PendingInvitations />
    </Box>
  )
}

export default GangInformation