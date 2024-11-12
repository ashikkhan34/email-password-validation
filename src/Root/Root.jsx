import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div className='max-w-7xl mx-auto shadow-md'>
            <Toaster position='right top'></Toaster>
            <Header></Header>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Root;