import {Link } from 'react-router-dom';
import './noFound.css';


export default function NoFound() {
  
  //function de deconexion logout : 
  const handleLogOut = () => {
    localStorage.clear();
  }

  //NoFoud erreur 404 :
  return (
    <>
      <div className="error-page-wrap">
        <article className="error-page gradient">
          <hgroup>
            <h1>404</h1>
            <h2>Oops ! page non trouvée</h2>
          </hgroup>
          <Link to='/api/auth/login' title="Retournez au site Internet." className="error-back" onClick={handleLogOut}>Retournez au site Internet.</Link>
        </article>
	    </div>
    </>
  )
}
