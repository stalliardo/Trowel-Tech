import React from 'react'
import { useSelector } from 'react-redux'
import LandingPage from '../landingPage/LandingPage';
import JoinOrCreatePrompt from './JoinOrCreatePrompt';


const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    console.log('currentUSerfrom home page  = ', currentUser);

    if(!currentUser){
        return <LandingPage />
    } 
    else if(!currentUser.gangId) {
        return <JoinOrCreatePrompt/>
    }
    else {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                Home
            </div>
            
        )
    } 
   
}

export default Home;