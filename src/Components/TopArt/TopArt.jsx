import React, { useContext, useEffect, useState } from 'react';
import axiosPublic from '../../Context/API/axiosPublic';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { data } from 'react-router';
import { Flower, Sparkles, Trophy } from 'lucide-react';
import ArtCard from '../../Templates/ArtCard/ArtCard';
import TopArtist from './TopArtist/TopArtist';

const TopArt = () => {
    const [arts, setArts] = useState([]);
    const {loading} = useContext(AuthContext);

    useEffect(() => {
        const getArts = async () => {
            try {
                const Data = await axiosPublic.get("/top-art");
                setArts(Data.data);
            } catch (err) {
                toast.error(err.massage);
            } 
        }
        getArts();
    }, [])

    // console.log(arts);

    return (
        <div className='max-w-6xl flex flex-col justify-center items-center w-full mx-auto px-7 transition-all'>
            {/* <h2>Featured Artworks</h2> */}
            <div className='flex  flex-col justify-center items-center gap-3'>
                <Trophy className='text-[#CA8A04] w-10 h-auto transition-colors'></Trophy>
                <h2 className='text-2xl font-bold transition-colors'>ARTISTS OF THE WEEK</h2>
                <p className='font-normal w-sm text-center transition-colors'>Meet the creative minds shaping the future of digital and traditional art on Artify.</p>
            </div>
            <div className='grid lg:grid-cols-3 gap-5 p-10'>
                    {
                        arts.map(Top => <TopArtist key={Top._id} Top={Top}></TopArtist>)
                    }
            </div>
        </div>
    );
};

export default TopArt;