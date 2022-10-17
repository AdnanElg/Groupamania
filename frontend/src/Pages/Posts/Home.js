import './home.css'
import Navbar from '../../Components/Navbar'
import UseFetchGet from '../../Hook/UseFetchGet';
import CardLists from '../../Components/CardLists';

export default function Home() {

  const {postList, error, loading} = UseFetchGet('http://localhost:3000/api/posts?_sort=id&_order=desc');


  return (
    <>
      <Navbar/>
        <div className="home">
          {error && <h1 style={{color:"red"}}>Désole une erreur est survenu ...</h1>}
          {loading && <div>En cour de traitement ...</div>}
          {postList && <CardLists postList={postList}/>}        
        </div>
    </>
  )
}
