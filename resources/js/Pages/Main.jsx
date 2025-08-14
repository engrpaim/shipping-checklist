import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import Booking from '../Component/Booking';

import '../../css/app.css';

export default function Main() {
    const agent = navigator.userAgent;
    const currentUrl = window.location.pathname.split('/').filter(Boolean).pop() || 'home';
    const cpitalizedFirstLetter =currentUrl.charAt(0).toUpperCase()+currentUrl.slice(1);

    let content ;

    if(currentUrl.toLowerCase() == 'booking' ){
        content = <Booking/>;
    }

    return(
        <>
            <Head title={cpitalizedFirstLetter}/>
            <MainLayout>
                <div className='children-container'>
                    {content}
                </div>
            </MainLayout>
        </>
    );
}
