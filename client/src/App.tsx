import Home from "./Pages/Home"

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Approved_Validator from "./Pages/Approved_Validator";
import Login from "./Pages/login";
import Register from "./Pages/register";
import CertificatesTable from "./Pages/certifcates";
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/Home' element={<Approved_Validator />} />
      <Route path="/register" element={<Register />} />
      <Route path="/certif-list" element={<CertificatesTable issuerId={1} />} />
    </Routes>
    </>
  )
}

export default App
