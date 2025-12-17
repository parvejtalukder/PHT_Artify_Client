import React, { useContext, useEffect, useState } from 'react';
import axiosPublic from '../../Context/API/axiosPublic';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { data } from 'react-router';
import { Flower, Sparkles } from 'lucide-react';
import ArtCard from '../../Templates/ArtCard/ArtCard';

const Featured = () => {
    const [arts, setArts] = useState([]);
    const {loading} = useContext(AuthContext);
    useEffect(() => {
        const getArts = async () => {
            try {
                const Data = await axiosPublic.get("/artworks");
                setArts(Data.data);
            } catch (err) {
                toast.error(err.massage);
            } 
        }
        getArts();
    }, [])

    // console.log(arts);

    return (
        <div className='max-w-6xl flex flex-col justify-center items-center w-full mx-auto px-7 transition-all pt-10'>
            {/* <h2>Featured Artworks</h2> */}
            <div className='flex flex-col justify-center items-center gap-3'>
                <Sparkles className='text-[#CA8A04] w-10 h-auto transition-colors'></Sparkles>
                <h2 className='text-2xl font-bold transition-colors'>FEATURED ARTWORKS</h2>
                <p className='font-normal lg:w-xl text-center w-sm transition-colors'>Discover the latest additions to our curated gallery, handpicked for their exceptional quality and creativity.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10'>
                {
                    arts.map(Art => <ArtCard key={Art._id} Art={Art}></ArtCard>)
                }
                {/* {
                    arts.length === 0 && 
                    <>
                        <span className="loading loading-bars loading-xl"></span>
                    </>
                } */}
            </div>
        </div>
    );
};

export default Featured;