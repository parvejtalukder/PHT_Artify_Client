import { Sparkles } from 'lucide-react';
import React from 'react';
import ExploreComp from '../../Templates/ExploreTemp/ExploreComp';

const Explore = () => {
    return (
        <div className='max-w-6xl flex flex-col justify-center items-center w-full mx-auto px-7 transition-all py-10'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <Sparkles className='text-[#CA8A04] w-10 h-auto transition-colors'></Sparkles>
                <h2 className='text-2xl font-bold transition-colors'>EXPLORE COLLECTIONS</h2>
                <p className='font-normal lg:w-xl text-center w-sm transition-colors'>Browse through our extensive collection of unique artworks curated from creators around the globe.</p>
            </div>
            <section>
                <ExploreComp></ExploreComp>
            </section>
        </div>
    );
};

export default Explore;