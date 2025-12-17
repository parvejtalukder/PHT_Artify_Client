import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const Loading = () => {
    const { loading } = useContext(AuthContext);
    // console.log(loading)
    return loading ? (
        <div className='fixed z-50 h-screen w-full flex justify-center items-center bg-base-300'>
            <span className="loading loading-infinity loading-xl"></span>
            {/* <p>Loading</p> */}
        </div>
    ) : null;
};

export default Loading;
