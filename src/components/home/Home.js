import React from 'react'
import { useSelector } from 'react-redux'
import JoinOrCreatePrompt from './JoinOrCreatePrompt';


const Home = () => {
    // TODO...
    const { currentUser } = useSelector((state) => state.user);
    console.log('user from state = ', currentUser);

    if(!currentUser.priceGangId){
        //then display the prompt comp
        return <JoinOrCreatePrompt/>
    } else {
        return (
            <div>Home</div>
        )
    }
    

    
}

export default Home;

// 1 - Check if the user has entered gang information
// 2 - If not display the prompts for creating or joing a gang

// Need to create the post registration home page comp