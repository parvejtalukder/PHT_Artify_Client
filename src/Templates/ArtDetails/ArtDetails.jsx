import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { api } from '../services/mockStore';
// import { useAuth } from '../context/AuthContext';
import { Heart, Check, HeartIcon, BookmarkIcon } from 'lucide-react';
// import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import axiosPublic from '../../Context/API/axiosPublic';
// import { AuthContext } from '../../Context/AuthContext/AuthContext';

const ArtDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const { user, setLoading, loading } = useContext(AuthContext);
  const [artwork, setArtwork] = useState(null);
  const [load, setLoad] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [likeCnt, setLikesCount] = ()

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoad(true);
      if (!id) return;
      try {
        const token = user.accessToken;
        // console.log("Token", user.accessToken);
        const getArt = await axiosPublic.get(`/artworks/${id}`);
        setArtwork(getArt.data);
      } catch (error) {
        
      }
    //   const data = await axiosPublic.get(id);
    //   if (data) {
    //     setArtwork(data);
    //     if (user) {
    //       const favs = await api.getFavorites(user.uid);
    //       setIsFavorite(favs.some(f => f.id === data.id));
    //     }
    //   }
      setLoad(false);
    };
    fetchArtwork();
  }, [id, user]);

   useEffect(() => {
   const isLike = async () => {
     try {
       const res = await axiosPublic.get(`/likes/${user.email}`, {
         headers: {
           Authorization: `Bearer ${user.accessToken}`
         }
       });
 
       setIsLiked(res.data.length > 0);
     } catch (error) {
       console.error(error);
     }
   };

    if (user?.email) {
    isLike();
    }
}, [user?.email]);


  const handleLike = async () => {
  setLoading(true);

  try {
    if (isLiked) {
      // Optional: implement unlike logic later
      // setIsLiked(false);
      // setLikesCount(prev => prev - 1);
      toast.error("Disliked!");
      return;
    }

    const newLike = {
      artworkId: artwork._id,
      userId: user.uid,
      userEmail: user.email
    };

    // Add like
    const add = await axiosPublic.post("/add-like", newLike, {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });
    const increase = await axiosPublic.patch(`/update-like/${artwork._id}`, null, {
      headers: {
        Authorization: `Beaerer ${user.accessToken}`
      }
    });
    if(add.data && increase.data)  {
      // setIsLiked(true);
      toast.success("Liked!");
    } else {
      toast.error("Failed to Like!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error");
  } finally {
    setLoading(false); 
  }
};


  const handleFavorite = async () => {
    // if (!user) return toast.error('Please login to add to favorites');
    // if (!artwork) return;
    // const status = await api.toggleFavorite(user.uid, artwork.id);
    // setIsFavorite(status);
    // toast.success(status ? 'Added to Favorites' : 'Removed from Favorites');
  };
//   console.log(artwork);
  const [artist, setArtist] = useState([]);

  useEffect(() => {
  if (!artwork?.artistId) return;
    const getArtist = async () => {
      try {
        const res = await axiosPublic.get(`/artist/${artwork.artistId}`);
        // console.log(Top.artistId);
        setArtist(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getArtist();
  }, [artwork?.artistId]);

  console.log(isLiked);

  return (
    <div className='lg:max-w-6xl w-full mx-auto p-10'>
        <div className='h-auto bg-accent rounded-xl'>
            {
                artwork && 
                <section className='grid grid-cols-1 bg-base-300 lg:grid-cols-2 rounded-xl'>
                    <div className='relative rounded-t-lg lg:rounded-l-lg  p-10 bg-base-300 w-full h-full'>
                        <img src={artwork.imageURL} alt={artwork.title} className='rounded-2xl w-full h-full object-contain' />
                    </div>
                    
                    <div className='relative lg:rounded-r-lg rounded-b-lg flex flex-col bg-base-300 p-10 w-full h-full'>
                        {/* <h2>{artwork.title}</h2> */}
                        <div className='px-2 py-1 text-white rounded-full cinzel-font font-medium transition-all bg-accent w-30 shadow-[inset_0_0_4px_rgba(0,0,0,0.3)] hover:shadow-yellow-500/30'>
                            <p className='text-center'>{artwork.category}</p>
                        </div>
                        <h2 className='text-4xl text-accent mt-2'>{artwork.title}</h2>
                        <div className='flex mb-2 justify-start items-center gap-2'>
                            <p>Artwork By <span className='font-semibold'>{artist.Name}</span></p>
                            <div onClick={handleLike} className={`${isLiked ? "text-pink-700" : ""}`}><HeartIcon></HeartIcon></div>
                            <div><BookmarkIcon></BookmarkIcon></div>
                            {/* <p>Email {artist.Email}</p> */}
                        </div>
                        <hr />
                        <div className='mt-2'>
                          <p className='text-nd text-justify'>{
                          artwork
                          .description
                          .split(' ')
                          .slice(0, 30)
                          .join(' ') + (artwork.description.split(' ').length > 30 ? '...' : '')
                          }
                          </p>
                        </div>
                        <div className='flex justify-around shadow-xl bg-black/30 rounded-sm mt-2'>
                            <p className='text-accent'>
                                <span className='font-bold'>Price: </span>
                                {
                                    !artwork.price && "Not for sale"
                                }
                                {
                                    artwork.price && `${artwork.price}`
                                }
                            </p>
                            <p className='text-accent'>
                                <span className='font-bold'>Dimension: </span>
                                {
                                    !artwork.dimensions && "N/A"
                                }
                                {
                                    artwork.dimensions && `${artwork.dimensions}`
                                } 
                            </p>
                            <p className='text-accent'>
                                <span className='font-bold'>Liked By: </span>
                                {
                                    artwork.likesCount && `${artwork.likesCount}`
                                } 
                            </p>
                        </div>
                    </div>
                </section>
            }
            {
                load && <div className='text-center text-green-600 py-10 font-bold text-2xl'>Loading...</div>
            }
            {
                !artwork && !load && <div className='text-center text-red-600 py-10 font-bold text-2xl'>Artwork not found</div>
            }
        </div>
        <ToastContainer></ToastContainer>
    </div>
  );
};

export default ArtDetails;