import { LoaderIcon, Sparkles } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
// import ExploreComp from '../../Templates/ExploreTemp/ExploreComp';
import axiosPublic from '../../Context/API/axiosPublic';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import ArtCard from '../../Templates/ArtCard/ArtCard';

const Explore = () => {
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
      if (ToSearch === "") {
        setLot(false);
        return setArts(back)
        };
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

    const NoArts = <> <div className='h-full w-full  flex justify-center items-center py-30 px-50'><p>NO ARTS</p></div> </>
    return (
        <div className='max-w-6xl flex flex-col justify-center w-full mx-auto px-7 transition-all py-10 gap-6'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <Sparkles className='text-[#CA8A04] w-10 h-auto transition-colors'></Sparkles>
                <h2 className='text-2xl font-bold transition-colors'>EXPLORE COLLECTIONS</h2>
                <p className='font-normal lg:w-xl text-center w-sm transition-colors'>Browse through our extensive collection of unique artworks curated from creators around the globe.</p>
            </div>
            <section>
                {/* // this between not going */}
                <section className='flex flex-col gap-5 lg:flex-row justify-between items-center w-full'>
                <h2 className='text-accent font-bold text-xl'>
                    (<span>{arts.length}</span>) Arts Found
                </h2>
                <div className='lg:w-64'>
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
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10'>
                  {lod && (
                    <div className='col-span-full flex justify-center items-center h-40 pb-40'>
                      <span className="loading loading-spinner loading-lg text-yellow-500"></span>
                    </div>
                  )}
                
                  {arts.length === 0 && !lod && (
                    <div className='col-span-full flex justify-center items-center h-40'>
                      <p>NO ARTS</p>
                    </div>
                  )}

                  {
                    arts.map(Art => <ArtCard key={Art._id} Art={Art}></ArtCard>)
                  }
                  {/* Map arts here */}
                </section>
                {/* <ExploreComp></ExploreComp> */}
            </section>
        </div>
    );
};

export default Explore;