import {useState} from 'react';
import { useNavigate} from "react-router-dom";
import './formCreate.css';
import Navbar from '../../Components/Navbar';


export default function FormCreate() {
  const token = localStorage.getItem("TOKEN");    
  const userId = localStorage.getItem("userId");
   
  
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();


  const handleImage = (e) => {
    const [file] = e.target.files;
    setPreview(URL.createObjectURL(file));
    setImageUrl(e.target.files[0]);
  }


  const handleSubmitPost = e => {
    e.preventDefault();


    const post = new FormData();
    post.append('userId' , userId);
    post.append('image' , imageUrl);
    post.append('message' , message);

   
   
    fetch("http://localhost:3000/api/posts", 
        {
          method: 'POST',
          body: post,
          headers: {
            'Authorization': "Bearer " + token,
          },
        })
        .then(responce => {
          console.log('Vous avez réusie à crée votre post');
          return responce.json();
        })
        .then(data => {
          console.log(data);
          navigate('/api/posts');
        })
        .catch(error => {
          console.log(error);
        })
      }

      

    return (
      <>
        <Navbar/>
        <form onSubmit={handleSubmitPost} className="form">
            <div className="form-group">
              <label htmlFor="body">
                <u>Image :</u>
              </label>
              <div className='container-img'>   
                <img src={preview} alt=''/>
              </div>
              <span className='form-click'>
                <i className="fas fa-solid fa-download"></i>
                Cliquez pour télécharger la 
                photo depuis votre appareil
              </span>
              <input type='file'accept="image/png, image/jpeg, image/jpg" onChange={handleImage}/>
              <span className='form-recomendation'><i>Recommendation: Utilisez des fichiers .jpg
              de haute qualité de moins de 20mo.</i></span>
            </div>
            <div className="form-group">
              <label htmlFor="body"><u>Description du poste :</u></label>
              <textarea
                required
                maxLength={1000}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder=' Veuillez saisire votre texte... '
                className="form-control textarea"
                rows="10">
              </textarea>
            </div>
            <div className="form-group">
              <div className='mobile-btn'>
                <button type="submit" className="btn-create">Creer Poste</button>
              </div>
            </div>
        </form>
      </>
    )
}