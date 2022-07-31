import './App.css';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from './components/home/Home';
// import LandingPage from './components/landingPage/LandingPage';
import { useSelector } from 'react-redux'
import Auth from './components/auth/Auth'




function App() {

  const { currentUser } = useSelector((state) => state.user);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user){
        console.log('User called from authStateChanged function');
        // TODO - dispatch setUser();
    } else {
      console.log('no user found');
        
        // user is signed out
    }
})


  return (
    <div className="App">
      {
        currentUser ? <Home /> : <Auth />
        
      }
    </div>

  );
}

export default App;
