import React,{ useState, useEffect} from "react";
import { usePage } from "@inertiajs/react";
import '../../css/home.css';
import Airplane from '../../images/airplane.png';
import Truck from '../../images/truck.png';
import MainLayout from '../Layout/MainLayout';
import Booking from '../Layout/Booking';
import Notification from "../Layout/Notification";
import Queue from "../Layout/Queue";
import { useApp } from "../Context/AppContext";

export default function Home(){

    const {ip} = useApp();
    const {name} =useApp();
    const {idNumber} = useApp();
    const {success} = useApp();
    const {error} = useApp();
    const {queue} = useApp();
    const {url} = usePage();

    const currentUrl = window.location.pathname.split('/').filter(Boolean).pop() || 'home';
    const cpitalizedFirstLetter = currentUrl.charAt(0).toUpperCase()+currentUrl.slice(1);
    const bookingView = ['booking','save'];
    const loadingView = ['queue','mc','mcu','mcups'];

    const [messageDetails ,setMessageDetails] = useState(null);
    const [NotificationMessage , setNotification] = useState(null);
    const [ queueData , setQueue ] = useState(null);

    function detectDevice(){
        const agent = navigator.userAgent;
        console.log('User Agent: ' , agent);
        const mobileRegex  = /And|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);

        if(mobileRegex){
            return true
        }else{
            return false
        };
    }

    const isMobileDevice = detectDevice();
    console.log('TABLET ? ',isMobileDevice);

    useEffect(()=>{
        if(!queue)return;
        setQueue(queue);
    },[queue]);

    useEffect(()=>{
        if(!success && !error ) return;
        setMessageDetails(success ?? error);
        const message = messageDetails ? messageDetails : success ?? error;
        setNotification(message);
        const displayNotif = setTimeout(()=>{
            setNotification(null);
        },2000);

        return ()=> clearTimeout(displayNotif);
    },[success,error])
    function homeOption(){
        return(
               <>
                <div className="log-in">
                    {
                        ip !== null ?
                        <div className="checking-ip">
                            <div className="checking-title">
                                <h1>Welcome&nbsp;{name}&nbsp;({idNumber})</h1>
                            </div>
                            <div className="button-containers">
                                {
                                    !isMobileDevice ?
                                    <>
                                        <a href="/shipping-checklist/booking" className="button-options">BOOK</a>
                                        <a href="/shipping-checklist/queuers" className="button-options">QUEUERS</a>
                                    </>:<>
                                        <a href="/shipping-checklist/queue" className="button-options">LOAD</a>

                                    </>

                                }

                            </div>
                        </div>
                        :
                        <div className= "login-div">
                            <div className="login-input">
                                <label>ID NUMBER:</label>
                                <input/>
                            </div>
                            <div className="login-input">
                                <label>PASSWORD:</label>
                                <input/>
                            </div>
                            <div className="login-input">
                                <button>LOG&nbsp;IN</button>
                            </div>
                            <div className="login-input">
                                <label>Don't have an account?
                                    <a>
                                        <strong>Register</strong>
                                    </a>
                                </label>
                            </div>
                        </div>
                    }
                </div>
                <div className="airplane-image">
                    <img src={Airplane} alt="airplane"/>
                </div>
                <div className="truck-image">
                    <img src={Truck} alt="truck"/>
                </div>
                <div className="main-background-first">
                    <div className="main-title-group">
                        <h1 className="title-front">AUTOMATION ENGINEERING</h1>
                    </div>
                </div>
                <div className="main-background">
                    <div className="main-title-group">
                        <h1 className="title-front">SHIP</h1>
                        <h1 className="title-back">PING</h1>
                    </div>
                    <div className="main-title-group">
                        <h1 className="title-front">CH</h1>
                        <h1 className="title-back">ECK</h1>
                        <h1 className="title-front">LIST</h1>
                    </div>
                </div>
                <footer className="footer">
                    <div className="hide-effect">
                        <h1>AUTOMATION ENGINEERING 2025</h1>
                    </div>
                    <div className="copy-right">
                        <h1>SHIN-ETSU MAGNETIC PHILIPPINES</h1>
                        <p>&#169;All rights reserved</p>
                    </div>
                </footer>
            </>
        );

    }



    return(

         <main className="main-container" style={{
                animation: bookingView.includes(currentUrl.toLowerCase()) ? 'none' : null,
                background:  bookingView.includes(currentUrl.toLowerCase()) ? 'none' : null,
            }}>
         {
            currentUrl.toLowerCase() == 'home'   ?
            <>
                {homeOption()}
            </>
            : bookingView.includes(currentUrl.toLowerCase()) &&  ip  && !isMobileDevice?
                <MainLayout>
                    {
                        NotificationMessage &&  (success || error) && <Notification message={ success ?? error } type={ success ? 'success' : 'error'}/>
                    }
                    <Booking/>
                </MainLayout>
            : loadingView.includes(currentUrl.toLowerCase()) &&  ip  && isMobileDevice?
                <MainLayout mobile={isMobileDevice}>
                    <Queue data={queueData}/>
                </MainLayout>
            : null


         }
        </main>


    );
}
