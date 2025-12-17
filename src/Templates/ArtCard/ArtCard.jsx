import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import axiosPublic from '../../Context/API/axiosPublic';

const ArtCard = ({ Art }) => {

  const [artist, setArtist] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!favorite);

  useEffect(() => {
  if (!Art?.artistId) return;
  
    const getArtist = async () => {
      try {
        const res = await axiosPublic.get(`/artist/${Art.artistId}`);
        setArtist(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    getArtist();
  }, [Art?.artistId]);

  // console.log(artist);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-transparent rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={Art.imageURL}
          alt={Art.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-between p-6">
          <span className="px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full uppercase">
            {Art.category}
          </span>
        </div>

        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 p-2 bg-base-200 rounded-full hover:scale-110 z-10"
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Bookmark
            size={20}
            className={favorite ? "fill-gold-500 text-gold-500" : "text-gray-500"}
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-accent truncate mb-1">{Art.title}</h3>
        <p className="text-sm mb-2">by <span className="font-semibold">{artist.Name || "Unknown Artist"}</span></p>

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-1 text-gray-400 hover:text-red-500">
            <Heart size={18} />
            <span>{Art.likes}</span>
          </div>
          <Link
            to={`/artwork/${Art._id}`}
            className="text-sm font-semibold text-gold-600 hover:text-gold-500 uppercase"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtCard;
