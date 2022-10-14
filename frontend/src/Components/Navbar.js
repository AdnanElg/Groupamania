import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../Assets/logo.svg';


export default function Navbar() {
  
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);
  const navigate = useNavigate()


  const handleToggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setLargeur(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    }

  }, [])


  const handleLogOut = () => {
    localStorage.clear();
    navigate('/api/auth/login')
  }


  return (
    <nav>
      {(toggleMenu  || largeur > 900) && ( 
      
        <div className='liste'>
          <Link to='/api/posts'><img src={logo} alt="" /></Link>
          <div className='containers-items'>
            <Link to='/api/posts/newPost'><span className='items'>Ajouter un post</span></Link>
            <button onClick={handleLogOut}><span className='items'>Se déconnecter</span></button>
          </div>
        </div>

      )}

      <button onClick={handleToggleNav} className='btn'><i className="fas fa-solid fa-bars"></i></button>
    
    </nav>
  );
}
