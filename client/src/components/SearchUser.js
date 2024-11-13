/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import { IoClose } from "react-icons/io5";
import UserSearchCard from "./UserSearchCard";
import axios from "axios";
const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
 

  const handleSearchData = async()=>{
    try {
        setLoading(true);
        const response = await axios.post("http://localhost:8080/user/search",
            {
                search:search
            },{withCredentials:true});
        // console.log(response);
        setLoading(false)

            setSearchUser(response.data.data)
        
    } catch (error) {
        console.log(error.message);
        
    }
  }

  useEffect(()=>{
    handleSearchData();
  },[search]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex ">
          <input
            type="text"
            placeholder="Search user by name, email...."
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>
         <div className="overflow-y-scroll">

         
        <div className="bg-white mt-2 w-full p-4 rounded ">
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}

          { loading && (
            <p>
              <Loading />
            </p>
          )}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return (
                <div key={user?._id} className="overflow-y-scroll">
                <div>
                <UserSearchCard  user={user} onClose={onClose} />
                  </div>
                </div>
              );
            })}
        </div>
        </div>
      </div>

      <div
        className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white"
        onClick={onClose}
      >
        <button>
          <IoClose  size={30}/>
        </button>
      </div>
    </div>
  );
};

export default SearchUser;
