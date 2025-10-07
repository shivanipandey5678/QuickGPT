import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets';
import Loading from './loading';
import { useAppContext } from '../context/useContext';


const Credits = () => {

  const [plans,setPlans] = useState([]);
  const [loading,setLoading] =useState(true);
  const {currancy} = useAppContext();

  const fetchPlans = async() => {
     setPlans(dummyPlans)
     setLoading(false)
  }

  useEffect(()=>{
    fetchPlans()
  },[])

  if(loading) return <Loading/>
  return (
    <div className="w-full">
  
    <h1 className="text-3xl font-bold text-center mb-3 mt-10 ">Credits</h1>
    <div className='flex flex-wrap justify-center gap-4 p-3 mt-10 '>
      
    
      {plans && plans.map((plan,i)=>(
        <div key={i}  className={
          `border p-5 flex flex-col justify-between rounded-md h-[330px] w-[300px]  ` +
          (i % 2 === 0
            ? 'border-[#A0522D]'      
            : 'dark:bg-[#980ffa]/40  border-white/20  bg-[#99a1b0]/30'           
          )
        }>
          <h3 className=' text-xl'><b>{plan.name}</b></h3>
          <p ><span className='text-[#980ffa] text-2xl font-semibold'>{currancy}{plan.price}</span> / {plan.credits}credits</p>
          <ul className="list-disc ml-6  ">
            {plan.features.map((item,i)=>(
              <li key={i} className='mt-1'>{item}</li>
            ))}
          </ul>
          <button className='text-white  bg-[#980ffa]  rounded-md   px-8 py-2 w-full text-center cursor-pointer'>Buy Now</button>

        </div>
      ))}
    </div>
    </div>
  )
}

export default Credits
