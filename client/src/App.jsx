import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Chatbox from './components/Chatbox'
import Credits from './pages/Credits.jsx'
import Community from './pages/Community.jsx'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading.jsx'
import Login from './pages/Login.jsx'
import { useAppContext } from './context/useContext'
import { Toaster } from 'react-hot-toast';

const App = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {pathname} =useLocation();
  const {user ,loadingUser} = useAppContext();
 

  if(pathname=='/loading' || loadingUser) return <Loading/>
 
  return (
    <>
     <Toaster />
    {!isMenuOpen  &&  <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={()=>setIsMenuOpen(true)}/>}
      <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white min-h-screen w-screen '>

        {user ? 
        (
          <div className='flex   h-screen w-full'>
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
          <Routes>
              <Route path='/' element={<Chatbox/>}/>
              <Route path='/credits' element={<Credits/>}/>
              <Route path='/community' element={<Community/>}/>
              
  
          </Routes>
        </div>
        ) : 
        (
          <div className='flex  h-full w-full'>
          
          <Routes>
             
              <Route path='/' element={<Login/>}/>
  
          </Routes>
        </div>
        )
        }
 
      </div>
   
       

    </>
  )
}

export default App
