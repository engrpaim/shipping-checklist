import React from 'react';
import { Head , usePage } from '@inertiajs/react';
import '../../css/app.css';

export default function MainLayout({children}){
    return(
        <>
            <nav className='nav-bar'>
                <div className="nav-bar-container">
                    <div className='nav-bar-left'>
                        <h1>Shipping&nbsp;Checklist</h1>
                    </div>
                    <div className='nav-bar-left'>
                        <a href="/shipping-checklist/home">Home</a>
                        <a href="/shipping-checklist/booking">Booking</a>
                        <a href="/shipping-checklist/mc">MC</a>
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </>
    );
}
