import Home from "./Pages/Home"

import Register from "./Pages/register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Approved_Validator from "./Pages/Approved_Validator";
import Login from "./Pages/login";

import Certif_page from "./Pages/Certif_page";
function App() {
  return (
    <>

    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/About' element={<Certif_page />} />
     <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path='/Home' element={<Approved_Validator />} />

    </>
  )
}

export default App
