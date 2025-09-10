import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Chatbox from './components/Chatbox'
import Credits from './pages/credits'
import Community from './pages/community'
import { assets } from './assets/assets'

const App = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
    {!isMenuOpen  &&  <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={()=>setIsMenuOpen(true)}/>}
      <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Routes>
            <Route path='/' element={<Chatbox/>}/>
            <Route path='/credits' element={<Credits/>}/>
            <Route path='/community' element={<Community/>}/>

        </Routes>
      </div>
      </div>
   
       

    </>
  )
}

export default App
