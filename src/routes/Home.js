import React from 'react'
import { useSelector } from 'react-redux'

import Container from '@mui/material/Container'

import LandingPage from '../components/landingPage/LandingPage';
import JoinOrCreatePrompt from '../components/home/JoinOrCreatePrompt';
import HoursDiaryContainer from '../components/hoursDiary/HoursDiaryContainer';

const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    console.log('current user from home page = ', currentUser);

    if (!currentUser) {
        return <LandingPage />
    }
    else if (!currentUser.gangId) {
        return <JoinOrCreatePrompt />
    }
    else {
        return (
            <Container sx={{ mt: "30px", padding: "20px", borderRadius: "5px" }} maxWidth="xl">
                {/* <Container sx={{ mt: "30px", backgroundColor: "backDrop.dark", padding: "20px", borderRadius: "5px" }} maxWidth="xl"> TODO decide if using backgdrop or not*/}
                <HoursDiaryContainer />
            </Container>
        )
    }

}

export default Home;

// TODO...
// add the hours diary here
// Add projected earnings here