import React, { useState } from "react";
import Divider from "./Divider";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditProfile = ({ onClose, data }) => {
  const [name,setName ] = useState("");
  const dispatch = useDispatch();

  const handleUploadPhoto = async(e)=>{
    e.preventDefault();
    e.stopPropagation();
  }
 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios.post("http://localhost:8080/user/update",{
        name
      },{withCredentials:true});

      console.log(response);
      dispatch(setUser(response?.data?.data));
      onClose();
      
      
    } catch (error) {
      
    }
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm ">Edit user details</p>
        <form className="grid gap-3 mt-3" onSubmit={(e)=>e.preventDefault()}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={data?.name}
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full py-1 px-2 focus:outline-primary border-0.5"
            />
          </div>
          <div>
            <div>Photo:</div>
            <div className="my-1 flex items-center gap-4">
              <label htmlFor="profile_pic">
                <button
                  className="font-semibold"
                  
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  id="profile_pic"
                  className="hidden"
                 onClick={handleUploadPhoto}
                />
              </label>
            </div>
          </div>
          <Divider/>
          <div className='flex gap-2 w-fit ml-auto '>
                    <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                    <button onClick={handleSubmit}
                     className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
                </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
