import React from 'react'
import { useSelector } from 'react-redux'
import LandingPage from '../components/landingPage/LandingPage';
import JoinOrCreatePrompt from '../components/home/JoinOrCreatePrompt';


const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    console.log('current user from home page = ', currentUser);

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
                Home Page
            </div>
            
        )
    } 
   
}

export default Home;