import './App.css';
import {GoogleAuthProvider, getAuth, signInWithPopup  } from 'firebase/auth';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const provider = new GoogleAuthProvider();

function App() {
  const handleGoogleSignIn = () => {
    const auth = getAuth()
    signInWithPopup(auth,provider)
    .then (result => {
      const user = result.user;
      console.log(user);
      
    })
  }
  return (
    <div className="App">
    <button onClick={handleGoogleSignIn} >Google Sign in </button>
    </div>
  );
}

export default App;
