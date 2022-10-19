import './formUpdate.css';
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Navbar from '../../Components/Navbar';



export default function FormUpdate() {
  
 const token = localStorage.getItem("TOKEN");
 const postData = useParams();
 const [message, setMessage] = useState('');
 const [imageUrl, setImageUrl] = useState('');
 const [post, setPost] = useState('');
 const [preview, setPreview] = useState('');
 const [userId, setUserId] = useState('');
 const navigate = useNavigate();

  
    //recuperation des donée du poste de saisie : 
    useEffect(() => {
        fetch(`http://localhost:3000/api/posts/${postData.id}`,{
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        })

        .then(responce => {
            return responce.json();
        })      

        .then(data => {
            console.log(data);
            setPost(data);
            setMessage(data.message);
            setPreview(data.imageUrl);
            setUserId(data.userId);
        })

        .catch(error => {
          console.log(error);
        })
    // eslint-disable-next-line       
    },[]);




    //uploade image : 
    const handleImage = (e) => {
        const [file] = e.target.files;
        setPreview(URL.createObjectURL(file));
        setImageUrl(e.target.files[0]);
    }



    // function de modification des données :
    const handleSubmitPut = (e) => {
        e.preventDefault();
      
        //recuperation des value : 
        const post = new FormData();
        post.append('userId', userId);
        post.append('image', imageUrl);
        post.append('message', message);
        


        //modification des value avec le meme userId :
        fetch( `http://localhost:3000/api/posts/${postData.id}`, {
          method: 'PUT',
          body: post, userId,
          headers: { 
              'Authorization': 'Bearer ' + token}
          })

          .then((responce) => {
            return responce.json();
          })

          .then(data => {
            console.log(data);
            console.log('Vous avez modifié une publication');
            navigate('/api/posts')
          })
          
          .catch((error) => {
            console.log(error)
            console.log('Vous n\'avez pas modifié votre publication')
          })
    }

    
    

 //FormModify : 
 return (
    <>
    <Navbar/>
        <form onSubmit={handleSubmitPut} className="form">
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
            <span className='date'>{post.date}</span>
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
                <button type='submit' value='Modifier' className="btn-danger">Modifier</button>
              </div>
            </div>
        </form>
    </>
  )
}
