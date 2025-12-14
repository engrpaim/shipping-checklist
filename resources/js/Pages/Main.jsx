import React from 'react';
import { Head , router, usePage } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import Booking from '../Layout/Booking';
import Home from './Home';
import '../../css/app.css';
import { useApp } from "../Context/AppContext";

export default function Main() {
    const {ip} = useApp();
    const {name} =useApp();
    const {idNumber} = useApp();
    const { url } = usePage();
    console.log(ip,name,idNumber,url);

    return(
        <>
            <Head title='Home'/>
            <Home/>
        </>
    );
}
