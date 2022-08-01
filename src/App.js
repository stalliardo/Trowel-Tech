import './App.css';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from './components/home/Home';
// import LandingPage from './components/landingPage/LandingPage';
import { useSelector } from 'react-redux'
import Auth from './components/auth/Auth'
import { useState } from 'react';




function App() {

  const [currentUser, setCurrentUser] = useState(useSelector((state) => state.currentUser));

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    
    if(user){
        console.log('User: ', user);
        const serializedUser = {
          // name: 
        }
        setCurrentUser(user)
        
        // TODO - dispatch setUser();

    } else {
      console.log('no user found');
        
        // user is signed out
    }
})


  return (
    <div className="App">
      {/* Needs loading indicator */}
      {
        currentUser ? <Home /> : <Auth />
        
      }
    </div>

  );
}

export default App;


// check if there is a user in locl storgae
// if user
    // then get the user doc from the database and setState the user
// else show auth forms