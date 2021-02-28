import React from 'react'
import { useSelector } from 'react-redux'
import "./App.css"
import Navbar from './Routes/Navbar'
import Rout from './Routes/Route'
import Sidebar from './Routes/Sidebar'

const App = () => {
  const newTheme = useSelector(state => state.app.newTheme)
  console.log(newTheme)
  return (
    <div className="App" style={{
      backgroundImage: `url(${newTheme})`, 
      // backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize:'100vw 800px'
    }}>
      <Navbar />
      <Sidebar/>
      <Rout />
      <div style={{minHeight:'300px'}}></div>
    </div>
  )
}

export default App
