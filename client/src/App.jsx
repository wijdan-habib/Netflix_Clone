import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import FirstPage from "./components/home/FirstPage"
import Signup from "./components/Signup"
import LogIn from "./components/LogIn"
import HomeScreen from "./components/home/HomeScreen"


function App() {
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<LogIn/>} />
      </Routes>
      </BrowserRouter>
        
      </>
  )
}

export default App
