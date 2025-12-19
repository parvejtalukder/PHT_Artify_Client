import { Sparkles } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const Gallery = () => {

    const [myArts, setMyArts] = useState([]);
    const {user, loading, setLoading} = useContext(AuthContext);

    useEffect()

    return (
        <div className='max-w-6xl flex flex-col justify-center w-full mx-auto px-7 transition-all py-10 gap-6'>
            <section>
                <div className='flex flex-col justify-center items-center gap-3'>
                   <Sparkles className='text-[#CA8A04] w-10 h-auto transition-colors'></Sparkles>
                   <h2 className='text-2xl font-bold transition-colors'>MY GALLERY</h2>
                   <p className='font-normal lg:w-xl text-center w-sm transition-colors'>Browse through our extensive collection of unique artworks curated from creators around the globe.</p>
                </div>
            </section>
            <section className='bg-accent w-full py-10 rounded-2xl px-20 gap-4'>

            </section>
        </div>
    );
};

export default Gallery;