import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import axiosPublic from '../../../Context/API/axiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { toast, ToastContainer } from 'react-toastify';


const EditCard = ({ Art }) => {

  const [artInfo, setArtInfo] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!favorite);
  const {user, loading, setLoading} = useContext(AuthContext);

  useEffect(() => {
  if (!Art) return;
    const getArtInfo = async () => {
      try {
        const res = await axiosPublic.get(`/artworks/${Art}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        });
        setArtInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getArtInfo();
  }, [Art]);


  const deleteOne = async () => {
    try {
        setLoading(true);
        const deleteThis = await axiosPublic.delete(`/art/${Art}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        const userData = {
          ArtId: Art,
          UsrId: artInfo.artistId,
        }
        const deleteFrmUsr = await axiosPublic.patch('/user/art/', {
          userData
        }, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
        )
        if(deleteThis.data && deleteFrmUsr.data) {
            setLoading(false);
            setTimeout(() => {
                toast.success("Deleted!");
            }, [1000]);
        } else {
            setLoading(false);
            setTimeout(() => {
                toast.error("Error while deleting!");
            }, [1000]);
        }
        // if(deleteOne.)
    } catch (error) {
        setLoading(false);
            setTimeout(() => {
                toast.error("Error while deleting!");
            }, [1000]);
    }
  }

//   console.log(artInfo);


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
          src={artInfo.imageURL}
          alt={artInfo.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-between p-6">
          <span className="px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full uppercase">
            {artInfo.category}
          </span>
        </div>

        <button
        //   onClick={toggleFavorite}
          className="absolute top-4 right-4 p-2  rounded-full hover:scale-110 z-10"
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {/* <Bookmark
            size={20} bg
            className={favorite ? "fill-gold-500 text-gold-500" : "text-gray-500"}
          /> */}
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-accent truncate mb-1">{artInfo?.title || "Unknown"}</h3>
        {/* <p className="text-sm mb-2">{}</p> */}

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div onClick={deleteOne} className="flex items-center space-x-1 bg-accent py-1 px-2 rounded-2xl hover:text-red-500">
            {/* <Heart size={18} /> */}
            <span className='font-bold hover:tex-red-300 text-red-600'>Delete</span>
          </div>
          <Link
            to={`/artwork/edit/${artInfo._id}`}
            className="text-sm font-semibold text-gold-600 hover:text-gold-500 uppercase"
          >
            EDIT NOW
          </Link>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </motion.div>
  );
};

export default EditCard;
