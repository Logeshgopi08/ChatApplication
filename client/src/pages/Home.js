/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import logo from "../assets-project/assets/logo.png";
import io from 'socket.io-client';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const fetchUserData = async()=>{
  try {
    const response = await axios.get("http://localhost:8080/user/user-detail",{withCredentials:true});
    
    dispatch(setUser(response?.data?.data));
    if(response?.data?.data?.logout){
      dispatch(logout())
      navigate("/email");
  }
    
  } catch (error) {
    console.log(error.message);
    
  }
  }

  useEffect(()=>{
    fetchUserData();
  },[]);



  useEffect(()=>{

    const socketConnection = io("http://localhost:8080",{
      auth : {
        token : localStorage.getItem('token')
      },
    });

    socketConnection.on('onlineUser',(data)=>{
      // console.log(data);
      dispatch(setOnlineUser(data));
      
    })
    
    dispatch(setSocketConnection(socketConnection));

    return ()=>{
      socketConnection.disconnect();
    }

  },[]);

  const basePath = location.pathname ==="/"
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar/>
      </section>
      <section  className={`${basePath && "hidden"}`}>
        <Outlet/>
      </section>
      
      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
            <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
    </div>
  )
}

export default Home;
