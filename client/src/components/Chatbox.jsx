import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/useContext'
import { assets } from '../assets/assets';
import Message from './Message';


const Chatbox = () => {

  const containerRef = useRef(null);

  const {selectedChat, theme} = useAppContext();
   
  

  const [messages,setMessages] = useState([]);
  const [loading,setLoading]= useState(false);
  const [prompt,setPrompt] = useState('');
  const [mode,setMode] = useState('text');
  const [isPublished,setIsPublished]= useState(false);

  const onSubmit = async(e) => {
    e.preventDefault();

  }


  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages || [] )
    }
  },[selectedChat])

  useEffect(()=>{
      if(containerRef.current){
        containerRef.current.scrollTo({
          top:containerRef.current.scrollHeight,
          behavior:'smooth',
        })
      }
  },[messages])
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
       {/* chat messages */}

       <div className='flex-1 mb-5 overflow-y-scroll' ref={containerRef}>
        {messages.length===0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img src={theme=== 'dark'? assets.logo_full : assets.logo_full_dark} alt="logo_full"  className='w-full max-w-56 sm:max-w-68'/>
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white '>Ask me anything.</p>
          </div>

        )}

        {
          messages.map((message,i)=>(
             <Message key={i} message={message}/>
          ))
        }

        {/* three dots animation */}
        {
          loading && <div className='loader flex items-center gap-1.5'>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          </div>
        }

       </div>
       {mode === 'image'&& (
        <label className='inline-flex items-center gap-2 mb-3 text-3 text-sm mx-auto'>
          <p className='text-xs'>Publish Generated Image to Community </p>
          <input type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e)=> setIsPublished(e.target.checked)}/>
        </label>
       ) }
       {/* prompt input box */}
       <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary  dark:border-[#806609F]/30 rounded-full w-full max-w-2xl p-3  mx-auto flex gap-4 items-center justify-between'>
       <div className='flex-1'>

            <select className='text-sm  outline-none mr-3' onChange={(e)=>setMode(e.target.value)} value={mode}>
          
              <option value="text" className='dark:bg-purple-900'>Text</option>
              <option value="image" className='dark:bg-purple-900'>Image</option>
              {/* <option value="zakirPersona" className='dark:bg-purple-900'>Persona of Zakir Khan</option>
              <option value="hiteshPersona" className='dark:bg-purple-900'>Persona of hitesh chodhary</option> */}
            </select>
            <input type="text" placeholder='Type your prompt here ...' onChange={(e)=>setPrompt(e.target.value)} value={prompt} className='outline-none flex-1'/>
       </div>
            <button disabled={loading} className='pr-2 cursor-pointer'><img src={loading? assets.stop_icon : assets.send_icon} alt="send_icon" /></button>
       </form>
    </div>
  )
}

export default Chatbox
