import React from 'react';
import { Head } from '@inertiajs/react';


export default function Main(){
    let agent = navigator.userAgent;
    return(
        <>
            <Head title="Home"/>
            <h1>{agent}</h1>
        </>
    );
}
