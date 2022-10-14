import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../Assets/logo.svg';
import './register.css';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


export default function Register() {

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

      
      fetch('http://localhost:3000/api/auth/signup', 

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
        console.log('Vous avez réusie à vous inscrire');
        return responce.json();
      })

      .then(data => {
        console.log(data);

        if (data) {
          navigate('/api/auth/login');
        } 

        if (!data.message) {
          setOpenSnackBar(true)
          navigate('/api/auth/signup')
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
        <div className='register-img'>
            <img src={logo} alt=""/>
        </div>

        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="content">
              <div className="input-field">
                <input onChange={e => setInputEmail(e.target.value)} value={inputEmail.email} name="email" type="email" placeholder="Email" required/>
              </div>
              <div className="input-field">
                <input onChange={e => setInputPassword(e.target.value)} value={inputPassword.password} name="password" type="password" placeholder="Password" required/>
              </div>
              <span className="link"><span className='span'>Tu à déja un compte ?</span><Link to="/api/auth/login"> Se connecter</Link></span>
            </div>
            <div className="action">
              <button type='submit'>S'inscrire</button>
              <button><Link to="/api/auth/login" className='btn-signup'>Se connecter</Link></button>
            </div>
          </form>
          {handleSnackBar()}
        </div>
      </>
    )
}
