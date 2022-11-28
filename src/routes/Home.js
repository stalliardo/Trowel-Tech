import React from 'react'
import { useSelector } from 'react-redux'

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
                <div>
                    Hours diary here,
                    Todo's here,
                    projected earnings here, subject to change
                </div>

            // <HoursDiaryContainer />


        )
    }

}

export default Home;

// TODO...
// add the hours diary here
// Add projected earnings here