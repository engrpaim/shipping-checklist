import React from 'react';
import { Head , usePage } from '@inertiajs/react';
import '../../css/app.css';
import { AppProvider } from "@/Context/AppContext";
import { useApp } from "../Context/AppContext";
import { Truck ,Ticket ,ArrowIcon} from '../SVG/ShippingLogos';
export default function MainLayout({children}){
    const {ip} = useApp();
    const {name} =useApp();
    const {idNumber} = useApp();
    console.log(ip,name,idNumber, 'nav');
    return(
       <AppProvider>
       <div className="main-child">
            <nav className='nav-bar'>
                <div className="nav-bar-container">
                    <div className='nav-bar-left'>
                        <div className='header-dash'>
                            <div className='icntrck'>
                                <Truck height={30} width={30} className={'truck-icon'} fill={'white'}/>
                            </div>
                            <div className='header-dash-title'>
                                <h1>SHIPMENT CHECKLIST</h1>
                                <p> powered by <strong>AE</strong></p>
                            </div>
                        </div>

                        <div className='menu-dash'>
                            <div>
                                <div className='menu-dash-title'>
                                    <p>SHIPMENT MENU</p>
                                </div>
                                <div className='menu-dash-options'>
                                    <div className='menu-dash-link'>
                                        <Ticket height={30} width={30}/>
                                        <a href="/shipping-checklist/booking"  className='nav-options' title="booking">Booking</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='logout-dash'>

                            <h1>{name}&nbsp;({idNumber})</h1>

                        <a href="/shipping-checklist/home" className='nav-logout'><ArrowIcon height={25} width={25} fill={'#A58400'} className='nav-logout'/></a>
                    </div>
                </div>
            </nav>
            <main className='content'>
                <section>
                    <div className='content-container'>
                        {children}
                    </div>
                </section>
            </main>
        </div>
        </AppProvider>
    );
}
