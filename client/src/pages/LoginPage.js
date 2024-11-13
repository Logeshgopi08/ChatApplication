import React, { useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const LoginPage = () => {
  const[emailId,setEmailId] = useState("");
  const[password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault()
    e.stopPropagation()
    try {
      const response = await axios.post("http://localhost:8080/auth/login",{emailId,password},{withCredentials:true});
      
      toast.success(response?.data?.message);
      if(response.data.success){
         dispatch(setToken(response?.data?.token));
         localStorage.setItem("token",response?.data?.token);
         setPassword("");
         setEmailId("");
         navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      
    }
  }
  return (
    <div>
      <Header/>
      <div className="mt-6">
        <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat app!</h3>
       <form className="grid gap-4 mt-5"  onSubmit={handleLogin}>
       <div className="flex flex-col gap-1">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Login
              </button>
       </form>
       <p className='my-3 text-center'>New User ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
