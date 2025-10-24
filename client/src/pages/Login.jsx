import React from 'react'
import toast from 'react-hot-toast';
import { useAppContext } from '../context/useContext';

const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {setUser ,setToken,axios}=useAppContext();
  const submitHandler = async(e)=> {
     e.preventDefault();
     try {
        if(state==="login"){
            const res= await axios.post('/api/user/login',{email,password});
            console.log("API Response login:", res.data);
            if (res.data.success) {
                    toast.success(res.data.message || "Chat loggedIn successfully!");
                    setUser(res.data.user)
                    setToken(res.data.token)
                    localStorage.setItem("token", res.data.token);
            } else {
                    toast.error("Failed to login chat!");
            }
        }else{
            const res= await axios.post('/api/user/register',{name,email,password});
            console.log("API Response register:", res);
            if (res.data.success) {
                toast.success(res.data.message || "Chat register successfully!");
                setUser(res.data.user)
                setToken(res.data.token)
                localStorage.setItem("token", res.data.token);
            } else {
                    toast.error("Failed to register chat!");
            }
        }
        
     } catch (error) {
        console.error("Error login.jsx chats:", error);
        toast.error("Something went wrong while login chats!");
     }
    
    
  }

  
  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <form onSubmit={submitHandler} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-purple-700 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-purple-700 cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login
