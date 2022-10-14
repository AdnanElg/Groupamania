import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../Assets/logo.svg';
import './login.css';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';



export default function Login() {

    const [inputEmail, setInputEmail] = useState({email: ""});
    const [inputPassword, setInputPassword] = useState({password: ""});
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
      e.preventDefault();
      
      
      const regExEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      }

      if(!regExEmail(inputEmail)){
        return setOpenSnackBar(true);
      } 
      
      const regExPassword = (value) => {
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,100}$/.test(value);
      }

      if(!regExPassword(inputPassword)){
        return setOpenSnackBar(true);
        
      } 


      fetch('http://localhost:3000/api/auth/login', 

      {
        method: 'POST',
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then(responce => {
        console.log('Vous avez réusie à vous connecter');
        return responce.json();
      })

      .then(data => {
        console.log(data);
        
        if (data) {
          navigate('/api/posts');
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('TOKEN', data.token);
          localStorage.setItem('admin', data.admin);
        } 

        if (!data.userId) {
          setOpenSnackBar(true)
          navigate('/api/auth/login')
        }
      })

      .catch(error => {
        console.log(error);
      })
      
    };


    
    function handleSnackBar(){
      return(
          <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
              <Alert severity= "error">Veuillez vérifier votre email ou votre mot de passe.</Alert>
          </Snackbar>
      )
    }


    return (
      <>
        <div className='login-img'>
          <img src={logo} alt=""/>
        </div>
        
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="content">
              <div className="input-field">
                <input onChange={e => setInputEmail(e.target.value)} value={inputEmail.email} name="email" type="email" placeholder="Email" required/>
              </div>
              <div className="input-field">
                <input onChange={e => setInputPassword(e.target.value)} value={inputPassword.password} name="password" type="password" placeholder="Password" required/>
              </div>
              <span className="link"><span className='span'>Pas encore de compte ?</span><Link to="/api/auth/signup"> Créez un compte</Link></span>
            </div>
            <div className="action">
              <button type='submit'>Se connecter</button>
              <button><Link to="/api/auth/signup" className='btn-signup'>S'inscrire</Link></button>
            </div>
          </form>
          {handleSnackBar()}
        </div>
      </>
  );
};
