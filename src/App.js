import './App.css';
import { getAuth,signOut, signInWithPopup,GoogleAuthProvider,GithubAuthProvider } from 'firebase/auth';
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GoogleAuthProvider();

function App() {
  const [user , setUser] =useState([]);
  const auth = getAuth()

  const handleGoogleSignIn = () => {
    signInWithPopup(auth,googleProvider)
    .then (result => {
      const {displayName, email, photoURL,providerId }= result.user;
      const loggedUser ={
        name: displayName,
        email: email,
        photo: photoURL,
        provider1: providerId
      };
      setUser(loggedUser);
    })
    .catch(error => {
      console.log(error.message);
      
    })

  }

    const handleGithub = () => {
      signInWithPopup(auth, githubProvider)
      .then(result => {
        const {displayName, email, photoURL,providerId }= result.user;
      const loggedUser ={
        name: displayName,
        email: email,
        photo: photoURL,
        provider1: providerId
      }
      setUser(loggedUser);
      }) 
    
  }


const handleSignOut = () => {
  signOut(auth)
  .then(() => {
    setUser({});
  })
}

  return (
    <div className="App">
  { !user.name ?
  <div>
   <button style= {{color:'red'}}
    onClick={handleGoogleSignIn} >Google Sign in </button>
    <button onClick={handleGithub}>Github Sign In </button>
   </div> :
    <button onClick={handleSignOut}>Sign Out </button>}

    <br />
    {
      user.name && <div>
        <h1>Welcome Khan {user.name} </h1>
        <h5>Email:{user.email} </h5>
        <h3>Provider: {user.provider1} </h3>
        <img src={user.photo} alt="" />
      </div>
    }
    </div>
  );
}

export default App;
