import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Todo from './components/todo/Todo';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user){
        console.log('User called from authStateChanged function');
    } else {
      console.log('no user found');
      
        // user is signed out
    }
})


  return (
    <div className="App">
     <Navbar />
     <Todo />
    </div>
  );
}

export default App;
