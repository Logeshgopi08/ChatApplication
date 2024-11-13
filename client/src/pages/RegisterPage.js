/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../components/Header";
import { IoClose } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [uploadPhoto,setUploadPhoto] = useState("");
  const navigate = useNavigate();


  const handleUploadPhoto =(e)=>{
           const file = e.target.files[0];
           setUploadPhoto(file)
  }

  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()
   
    const url = `http://localhost:8080/auth/register`;
    try {
       const response = await axios.post(url,{name,emailId,password,profile_pic},{withCredentials:true});
       console.log(response);
       toast.success(response.data.message)
       if(response.data.success){
        setName("")
        setEmailId("")
        setPassword("")
        setProfilePic("")

        navigate("/login");
       }
       
    } catch (error) {
      toast.error(error.message)
      
    }
  //  console.log();
   
  }
  

  return (
    <div>
      <Header />
      <div className="mt-5">
        <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
          <h3>Welcome to Chat app!</h3>
          <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="enter your email"
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
                placeholder="enter your password"
                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic">
                Photo :
                <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                  <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                    {uploadPhoto?.name
                      ? uploadPhoto?.name
                      : "Upload profile photo"}
                  </p>
                  {uploadPhoto?.name && (
                    <button
                      className="text-lg ml-2 hover:text-red-600"
                      onClick={handleClearUploadPhoto}
                    >
                      <IoClose />
                    </button>
                  )}
                </div>
              </label>
              <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  value={profile_pic}
                  className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                  onChange={handleUploadPhoto}
                />
            </div>
            <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Register
              </button>

          </form>
          <p className='my-3 text-center'>Already have account ? <Link to={"/login"} className='hover:text-primary font-semibold'>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
