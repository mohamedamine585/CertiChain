import Home from "./Pages/Home"
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>

    </>
  )
}

export default App
