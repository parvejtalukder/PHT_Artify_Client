import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { useState } from 'react';
import axiosPublic from '../../../Context/API/axiosPublic';
// import axios from 'axios';

const FavCard = ({ favOne }) => {
    const {user, setLoading} = useContext(AuthContext);
    const [Fav, setFav] = useState("");
    const getFav =  async () => {
        try {
            const theFav = await axiosPublic.get(`/artwork/${favOne.artworkId}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
            if(theFav.data) {
                setFav(theFav.data);
            } 
        } catch (error) {
            toast.error("Error While Loading!");
        }
    }
    getFav();
    // toast.success("It's loaded");
    // console.log(Fav);
  return (
    <motion.div
      className="bg-base-300/80 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm mx-auto md:max-w-md"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative aspect-[4/3]">
        <img
          src={Fav?.imageURL || 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}
          alt={Fav?.title || 'Artwork'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
          <span className="bg-gold-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">
            {Fav?.category || 'Category'}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg md:text-xl font-semibold text-base-content truncate">
          {Fav?.title || 'Artwork Title'}
        </h2>
        <p className="text-sm md:text-base text-base-content/95 line-clamp-3">
          {Fav?.description || 'No description available.'}
        </p>
        <div className="flex justify-between items-center mt-2">
          <button className="px-5 py-2 text-white rounded-full cinzel-font font-medium transition-all bg-accent shadow-[inset_0_0_4px_rgba(0,0,0,0.3)] hover:shadow-yellow-500/30">
          Remove Favs
          </button>
          {/* <span className="text-sm md:text-base font-medium text-gray-500">
            ${Fav?.likesCount || 'N/A'}
          </span> */}
        </div>
        {/* <ToastContainer></ToastContainer> */}
      </div>
      <ToastContainer></ToastContainer>
    </motion.div>
  );
};

export default FavCard;