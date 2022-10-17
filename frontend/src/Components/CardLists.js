import './cardLists.css';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

const CardLists = ({postList}) => {

  const token = localStorage.getItem("TOKEN");
  const userId = localStorage.getItem("userId");
  const admin = localStorage.getItem("admin");
  
  const [like, setLike] = useState();

  const navigate = useNavigate();



  const handleDelete = (id) => {
        
    fetch('http://localhost:3000/api/posts/' + id, {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + token},
    })

    .then(() => {
        window.location.reload();
        console.log("l'article à était suprimer");
    })

    .catch(error => {
        console.log('une erreur est survenue : ' + error);
    })
  }




  const handleEdit = (id) => { 
    navigate(`/api/posts/updatePost/${id}`)
  }




  const handleLike = (id) => {
    fetch(`http://localhost:3000/api/posts/${id}/like` , {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
    })
    .then(responce => {
      return responce.json();
    })
    .then(data => {
      console.log(data.id);
    })
  }

  


  
  return (
    <>
      <div className='gm-postcard-container'>
          {postList.map((post) => {

            function dateFormat(date){
              const dateCreate = new Date(date)
              const options = {year: 'numeric', month: 'numeric', day:'numeric'}
              return dateCreate.toLocaleDateString('fr-FR', options)
            }

            return (
              <div key={post._id} className='gm-postcard'>
                <div className='gm-mq-postcard'>
                    <img src={post.imageUrl} alt="" className='gm-postcard-img'></img>
                    <p className='gm-postcard-like' onClick={handleLike}><i className="fas fa-duotone fa-thumbs-up"></i> : {post.likes}</p>
                </div>
                <div className='gm-postcard-content'>    
                    <div className='gm-postcard-title'>
                        {(post.userId === userId || admin === 'true') && ( 
                          <> 
                            <h3 onClick={() => handleEdit(post._id)}><i className="fas fa-solid fa-pen"></i></h3>
                            <h3 onClick={() => handleDelete(post._id)}><i className="fas fa-solid fa-trash"></i></h3>
                          </>
                        )}
                    </div>
                    <p className='gm-postcard-text'>{post.message}</p>
                    <p className='gm-postcard-date'><strong> Publié le : {dateFormat(post.date)}</strong></p>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default CardLists