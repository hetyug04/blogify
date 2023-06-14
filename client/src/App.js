import React from 'react'
import { Landing, Register, SignIn, Home, UserPage, NewPost, Error, PostPage, ProtectedRoute } from './pages/index.js'
import {  Route, BrowserRouter, Routes} from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Landing/>}/>
        <Route path="/register" index element={<Register/>}/>
        <Route path="/login" index element={<SignIn/>}/>
        <Route path="/home" index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/user/:id" index element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
        <Route path="/new" index element={<ProtectedRoute><NewPost/></ProtectedRoute>}/>
        <Route path="/post/:id" index element={<ProtectedRoute><PostPage/></ProtectedRoute>}></Route>
        <Route path="*" index element={<Error/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App