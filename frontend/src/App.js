import {Routes, Route} from 'react-router-dom';

import Register from './Pages/Users/Register';
import Login from './Pages/Users/Login';
import Home from './Pages/Posts/Home';
import Post from './Pages/Posts/Post';
import Form from './Pages/Form/Form';
import NoFound from './Pages/Error/NoFound';

export default function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Login to = '/api/auth/login'/>}/>
          <Route path='/api/auth/login' element={<Login/>}/>
          <Route path='/api/auth/signup' element={<Register/>}/>
          <Route path='/api/posts' element={<Home/>}/>
          <Route path='/api/posts/newPost' element={<Form/>}/>
          <Route path='/api/posts/:id' element={<Post/>}/>
          <Route path='*' element={<NoFound/>}/>
        </Routes>
    </>
  )
}
