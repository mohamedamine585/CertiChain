import Home from "./Pages/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Approved_Validator from "./Pages/Approved_Validator";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/Home' element={<Approved_Validator />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
