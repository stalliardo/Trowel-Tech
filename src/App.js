import './App.css';

import Home from './components/home/Home';
import LandingPage from './components/landingPage/LandingPage';
import { useSelector } from 'react-redux'
import Auth from './components/auth/Auth'
import { CircularProgress, Container } from '@mui/material';
import Footer from './components/footer/Footer';

function App() {

  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      {
        user.isLoadingUserData ? <Container sx={{ mt: "100px" }}><CircularProgress style={{ color: "blue" }} /></Container> :
          user.currentUser ? <Home /> : <LandingPage />
      }
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;