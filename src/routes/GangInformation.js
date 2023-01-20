import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'

import MembersContainer from '../components/gangInformation/MembersContainer'
import InviteMemberForm from '../components/gangInformation/InviteMemberForm'
import PendingInvitations from '../components/gangInformation/PendingInvitations'
import { getInvitations } from '../features/gangInfo/gangInformationSlice'

const GangInformation = () => {
  const invitations = useSelector(state => state.gangInformation.invitations);
  const {currentUser} = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser.gangId && !invitations.length) {
      dispatch(getInvitations(currentUser.gangId));
    }
  }, []);

  return (
    <Box>
        <MembersContainer />
        <InviteMemberForm />
        <PendingInvitations invitations={invitations}/>
    </Box>
  )
}

export default GangInformation