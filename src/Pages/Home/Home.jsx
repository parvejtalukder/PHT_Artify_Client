import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Featured from '../../Components/Featured/Featured';
import TopArt from '../../Components/TopArt/TopArt';
import JoinCommunity from '../../Templates/JoinCom/JoinCommunity';

const Home = () => {
    return (
        <div className='flex flex-col justify-around items-center gap-10 pb-20'>
            {/* <p>Home</p> */}
            <Banner></Banner>
            <Featured></Featured>
            <TopArt></TopArt>
            <JoinCommunity></JoinCommunity>
        </div>
    );
};

export default Home;