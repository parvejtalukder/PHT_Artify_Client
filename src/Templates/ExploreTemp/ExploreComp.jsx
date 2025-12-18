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
            <section className='flex gap-10 justify-between items-center flex-col lg:flex-row w-full'>
                <h2 className='text-accent font-bold text-xl'>
                    (<span>{arts.length}</span>) Arts Found
                </h2>
                <div className='w-full lg:w-64'>
                    <label className="input text-accent w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            onChange={searchArt}
                            id='targetTxt'
                            className='text-accent w-full'
                            type="search"
                            required
                            placeholder="Search"
                        />
                    </label>
                </div>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10'>
                {
                    lod && <div className='h-full w-full  flex justify-center items-center py-30 px-50'>
                                <span className="loading loading-bars loading-xl"></span>
                    </div>
                }
                {
                    arts.fil
                }
            </section>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default ExploreComp;