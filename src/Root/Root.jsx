import React from 'react';
import Header from '../Templates/Header/Header';
import Footer from '../Templates/Footer/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='cinzel-font transition-all'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;