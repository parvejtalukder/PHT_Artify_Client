import React, { useContext, useEffect, useState } from 'react';
import axiosPublic from '../../Context/API/axiosPublic';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { title } from 'framer-motion/client';
import ArtCard from '../ArtCard/ArtCard';

const ExploreComp = () => {
    const [arts, setArts] = useState([]);
    const [artist, setArtist] = useState([]);
    const [lod, setLot] = useState(false);
    const [back, setBack] = useState([]);
    // const [artist, setArtist] 
    const {loading, setLoading} = useContext(AuthContext);
    useEffect(() => {
        const getArts = async () => {
            try {
                const Data = await axiosPublic.get("/artworks");
                setArts(Data.data);
                setBack(Data.data);
            } catch (err) {
                // toast.error(err.massage);
            } 
        }
        getArts();
    }, [])

    const searchArt = async (e) => {
      setLot(true);
      const ToSearch = e.target.value.toLowerCase();
      if (!ToSearch) return setArts(back);
      const artistIds = [...new Set(arts.map(art => art.artistId).filter(Boolean))];
      const artistResponses = await Promise.all(
        artistIds.map(id => axiosPublic.get(`/artist/${id}`))
      );
      const artistMap = {};
      artistResponses.forEach(res => {
        artistMap[res.data._id] = res.data.Name || "";
      });
      const filteredArts = arts.filter(art => {
        const titleMatch = (art.title || "").toLowerCase().includes(ToSearch);
        const artistMatch = artistMap[art.artistId]?.toLowerCase().includes(ToSearch);
        return titleMatch || artistMatch;
      });
      setArts(filteredArts);
      setLot(false);
    };

    // console.log(arts);
    const NoArts = <> <div className='h-full w-full  flex justify-center items-center py-30 px-50'>
                                <p>NO ARTS</p>
                    </div> </>

    return (
        <div className='py-2 max-w-6xl w-full mx-auto'>

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default ExploreComp;