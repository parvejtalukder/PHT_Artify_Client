import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import axiosPublic from '../../../Context/API/axiosPublic';

const TopArtist = ({ Top }) => {

  const [artist, setArtist] = useState([]);

  useEffect(() => {
  if (!Top?.artistId) return;
    const getArtist = async () => {
      try {
        const res = await axiosPublic.get(`/artist/${Top.artistId}`);
        // console.log(Top.artistId);
        setArtist(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getArtist();
  }, [Top?.artistId]);

  // console.log(artist);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-base-100 p-8 rounded-2xl shadow-lg text-center border border-gray-100"
    >
      <div className="relative inline-block mb-6">
        <img 
          src={artist.Photo} 
          alt={artist.Name} 
          className="w-32 h-32 rounded-full object-cover border-2 border-base-content p-1" 
        />
        <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs p-1 rounded-full">
          <Sparkles size={12}/>
        </div>
      </div>
      <h3 className="font-serif text-2xl font-bold mb-2">{artist.Name || "Unknown Artist"}</h3>
      <p className="text-gold-600 font-medium mb-4">Artist of <span className='font-black'>
        <Link to={`/artwork/${Top._id}`}>{Top.title}</Link>
        </span></p>
      <p className="text-gray-500 text-sm mb-6">
        Specializing in abstract and contemporary styles that challenge perception.
      </p>
      <Link to={`/profile/${Top.artistId}`} className="px-5 py-2 text-white rounded-full cinzel-font font-medium transition-all bg-accent shadow-[inset_0_0_4px_rgba(0,0,0,0.3)] hover:shadow-yellow-500/30">
        View Profile
      </Link>
    </motion.div>
  );
};

export default TopArtist;