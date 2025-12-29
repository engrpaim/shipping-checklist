/**
 * @returns Booking() Booking details per container
 * @param  @data sizes @returns forwarder , destination , data per row
 *
 */

import React, { useEffect, useState ,useRef, useReducer} from 'react';
import { router ,usePage } from '@inertiajs/react';
import * as XLSX from 'xlsx';
import '../../css/booking.css';
import {PickupDateLogo , DestinationLogo , TotalPalletLogo , ContainerLogo,BookLogo , RemoveLogo,Ship , ExcelFileSvg,Nodata ,DropBox,ShieldIcon} from '../SVG/ShippingLogos';
import { useApp } from "../Context/AppContext";
import Welcome from "../Welcome";
export default function Booking() {
    const {ip} = useApp();
    const {name} =useApp();
    const {idNumber} = useApp();
    const method =  window.location.pathname.split('/').filter(Boolean).pop() || null;

    /*Track State*/
    const [isDragging, setIsDragging] = useState(false);

    /*File Upload*/
    const [DataContainer , setDataContainer] = useState({});
    const [Notification , setNotification] = useState({});
    function indexingFnc(row){
        let allRequired = {};

        const dataRequirements = [
            "MODEL", "QUANTITY", "INVOICE NO.", "INVOICE DATE",
            "DESTINATION", "TYPE", "PICK UP DATE", "PICK UP TIME",
            "QUANTITY PER CARTON", "NO. OF CARTON", "PALLET WIDTH (MIDDLE)", "NO. OF PALLETS",
            "PLANT AREA",
        ];

        row.forEach((item,index)=>{
                if(!item || typeof item === 'number') return;
                const fontCase = item.toUpperCase().trim();
                if(!dataRequirements.includes(fontCase)) return;
                allRequired[index]= fontCase;
        })

        return allRequired;

    }

    function checkCount(row){
        let countInclude = 0;

        const detectTitle = [
            "MODEL", "QUANTITY", "INVOICE NO.",
        ];
        row.forEach((items)=>{
            detectTitle.includes(items) ? countInclude +=1 : null;
        });

        return countInclude;
    }
     function getDate(serial)
    {
        const excelEpochOffset = 25569;
        const utcMillis = (serial - excelEpochOffset) * 86400 * 1000;
        const date = new Date(utcMillis);

        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    }


      function excelTimeToHHMM(decimal)
    {
        const totalMinutes = Math.round(decimal * 24 * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
          const seconds = totalMinutes % 60;

        return `${hours.toString().padStart(2, '0')}:` +
           `${minutes.toString().padStart(2, '0')}:` +
           `${seconds.toString().padStart(2, '0')}`;

    }

    function getTime(data){
        const time = data? data :null;
        const newTime = excelTimeToHHMM(time);
        return newTime;
    }
    const handleFileChange = async (e) => {
        setNotification(null);
        const file = e.target.files[0];

        if(!file.name.includes('.xlsx')){
            setDataContainer(null);
        }
         const fileSizeInKB = (file.size / 1024).toFixed(2);
        /*DATA REQUIREMENT*/
        const arrayBuffer = await file.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        const hashBuffer = await window.crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        let Forwarder = '';
        let CurrentForwarder = 0;
        let CurrentInvoice = 0;
        let CurrentContainer = 0;
        let KeyIndexing = {};
        let AllData = {};
        let model = '';
        let type = '';
        let destination = '';
        let pickupdate = '';
        let picktime = '';
        let indexType = 0;
        let indexDestination = 0;
        let indexPickUp = 0;
        let indexPickTime = 0;

        console.log(json);

        json && json.forEach((row,index)=>{
            /* @data sizes */
            switch (true){
                //Sets forwarder
                case row.length === 1 && row[0] !== '' && !row[0].includes("REV"):
                    Forwarder = row[0];
                    CurrentForwarder += 1;
                    break;
                //Check if row is valid
                case row.length > 25 :
                    const IsValidRow = checkCount(row);
                    IsValidRow === 3 ?KeyIndexing = indexingFnc(row):null;
                    break;
                //Check if will meet or exceeds in required data
                case row.length > 7 && row.length < 30:
                    CurrentInvoice += 1;
                    //return key to access  used to accessed needed data per row
                     Object.entries(KeyIndexing || {}).map(([key,value])=>{
                        switch(true){
                            case value.toUpperCase().trim() === 'TYPE':
                                indexType = key;
                                break;
                            case value.toUpperCase().trim() === 'DESTINATION':
                                indexDestination = key;
                                break;
                            case value.toUpperCase().trim() === 'PICK UP DATE':
                                indexPickUp = key;
                                break;
                            case value.toUpperCase().trim() === 'PICK UP TIME':
                                indexPickTime = key;
                                break;
                            default:
                                break;
                        }
                     })
                    //return per row
                    Object.entries(KeyIndexing || {}).map(([key,value])=>{
                        if(row?.[indexType] &&   row?.[indexType] !== type && indexType !== 0){
                            type  = row?.[indexType];
                            pickupdate = row?.[indexPickUp];
                            picktime = row?.[indexPickTime];
                            CurrentContainer += 1;

                        }

                        if(row?.[indexDestination] &&   row?.[indexDestination] !== destination && indexDestination !== 0){
                            destination  = row?.[indexDestination];

                        }

                        if(KeyIndexing?.[key].toUpperCase().trim() === 'MODEL' &&  row?.[key] && type){
                             model = row?.[key];
                        }

                        if(model && model !== '' && row?.[key] && !model.includes("by") && type){
                               AllData[Forwarder] ??= {};
                               AllData[Forwarder]['DATE']= pickupdate ? getDate(pickupdate):'-' ;
                               AllData[Forwarder][type] ??= {};
                               AllData[Forwarder][type][destination]??= {};
                               AllData[Forwarder][type][destination]['TIME']= picktime ? getTime(picktime):'-' ;
                               AllData[Forwarder][type][destination][model]??= {};
                               AllData[Forwarder][type][destination][model][KeyIndexing?.[key]] = row?.[key];
                        }


                    });
                    break;
                default:
                    break;
            }



        });

        setDataContainer(prev =>({
            ...prev,
            DISPLAY:AllData,
            COUNTFORWARDER:CurrentForwarder,
            COUNTINVOICE:CurrentInvoice,
            COUNTCONTAINER:CurrentContainer,
            HASH:hexHash,
            SOURCE:file.name,
            SIZE:fileSizeInKB,
         }));

         if(Object.entries(AllData).length === 0){
            setNotification( prev =>({
                ...prev,
                type : 'Booking',
                error:'Invalid Excel data!',
            }));
         }

    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileChange({ target: { files: [file] } });
        }
    };

    /*Buttons functions*/
    const bookedData = (Forwarder, Container, key) => {
            setDataContainer(prev => {

                if (!prev?.DISPLAY?.[Forwarder]?.[Container]?.[key])
                {
                 return prev;
                }

                const containerData = prev.DISPLAY[Forwarder][Container];
                const { [key]: _, ...remainingKeys } = containerData;

                if (Object.keys(remainingKeys).length > 0) {
                    return {
                        ...prev,
                        DISPLAY: {
                        ...prev.DISPLAY,
                        [Forwarder]: {
                            ...prev.DISPLAY[Forwarder],
                            [Container]: remainingKeys
                        }
                        }
                    };
                }
                const forwarderData = prev.DISPLAY[Forwarder];
                const { [Container]: __, ...remainingContainers } = forwarderData;

                if (Object.keys(remainingContainers).length <= 1) {
                const { [Forwarder]: ___, ...remainingForwarders } = prev.DISPLAY;

                return {
                    ...prev,
                    DISPLAY: remainingForwarders
                };
                }
                return {
                    ...prev,
                    DISPLAY: {
                        ...prev.DISPLAY,
                        [Forwarder]: remainingContainers
                    }
                };
            });
            router.visit('/shipping-checklist/booking/save',{
                    method:'post',

                    data:
                    {
                        'data':DataContainer["DISPLAY"]?.[Forwarder]?.[Container]?.[key] ?? null,
                        'forwarder':Forwarder ?? null,
                        'destination':key ?? null,
                        'type':Container ?? null,
                        'date': DataContainer["DISPLAY"]?.[Forwarder]["DATE"] ?? null,
                        'hash': DataContainer["HASH"]?? null,
                        'size': DataContainer["SIZE"]?? null,
                        'source': DataContainer["SOURCE"]?? null,
                    },
                    preserveState: true,
                    preserveScroll:true,
                    onSucess:(page) => {
                        console.log('Saving Data!');
                    },
                    onError: (errors) => {
                        console.error('Error scanned:', errors);
                    }
            });
        };



    const removeBooked = (e) => {};



    //DESIGN HOVER
    /*Handle file*/
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const BookingSection = ({ data, className , inner=true ,Container='Not found!' , Forwarder='Not found!'}) => (
            data && Object.entries(data).map(([key ,value])=>{

            const isObject = typeof value === "object" && value !== null;
            if(key.includes("PICK UP")||key.includes("TYPE") ||key.includes("DESTINATION")) return;

            const titleHeaders = [
                "MODEL", "QUANTITY", "INVOICE NO.",
                "QUANTITY PER CARTON", "NO. OF CARTON", "PALLET WIDTH (MIDDLE)", "NO. OF PALLETS",
                "PLANT AREA",
            ];

            return(
                <div key={key} className='booking-destination'>
                    {
                        inner ?
                            <div className="booking-data-type-header">
                                <h1>Destination:</h1>
                                <p>{key}</p>
                            </div>:null
                    }
                    {
                        isObject &&
                        <>


                        <div className='booking-details'>
                            <table >
                                <thead>

                                    {
                                        titleHeaders.map((titles,index)=>(
                                            <th key={index}>{titles}</th>
                                        ))
                                    }
                                </thead>
                                <tbody>
                                    {
                                        Object.entries(value).map(([keyModel,modelValue])=>{
                                            if(keyModel === 'TIME' ) return;
                                            return(
                                                <tr key={keyModel} >
                                                    {
                                                        titleHeaders.map(acces=>{
                                                            const dataCheck = modelValue?.[acces];
                                                            if(typeof modelValue?.[acces] === 'number'){}
                                                            return <td key={acces}>{modelValue?.[acces]??'-'}</td>
                                                        })
                                                    }
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='confirmation-tab'>
                            <div>
                                <p>Are you sure you want to book?</p>
                            </div>
                            <div   className='confirmation-buttons'>
                                <button className="success-btn" onClick={() => bookedData(Forwarder, Container,key)}>BOOK</button>
                                <button className="err-btn">CANCEL</button>
                            </div>
                        </div>
                                                        </>
                    }
                </div>
            );
        })
    );

useEffect(()=>{if(DataContainer &&DataContainer["DISPLAY"] && Object.entries(DataContainer["DISPLAY"]).length === 0 &&  Object.entries(DataContainer["DISPLAY"]).map(([key,value])=>value === null) ){
                console.log('GHELLO');
                setDataContainer(null);
             };},[DataContainer])

    console.log(' DATA CONTAINER:',DataContainer , Notification);
    return (
        <div className='booking-compile'>
            <div className="file-uploader-container">
                <div className="file-header">
                    <h1>Booking</h1>
                    <hr/>
                    <p>Book your shipment today.</p>
                </div>
                <div className="booking-details-macro">
                    <div
                        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="upload-button">
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                id="excel-upload"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="excel-upload" className="upload-label">
                                <DropBox height={30} width={30} className={"dropbox-icon" }/>
                                Upload File
                            </label>
                            </div>

                        <div className="drag-here">
                            Drag file here
                        </div>
                    </div>
                    <div className='booking-zone'>
                        <h1>NUMBER OF BOOKING</h1>
                        <p>Forwarder:&nbsp;<strong>{DataContainer && DataContainer.COUNTFORWARDER? DataContainer.COUNTFORWARDER:0}</strong></p>
                        <p>Number of Container:&nbsp;<strong>{DataContainer &&  DataContainer.COUNTCONTAINER? DataContainer.COUNTCONTAINER:0}</strong></p>
                        <p>Number of Invoice:&nbsp;<strong>{ DataContainer && DataContainer.COUNTINVOICE ?DataContainer.COUNTINVOICE:0}</strong></p>
                    </div>
                    <div className='security-zone'>
                        <div>
                            <h1>FILE SECURITY</h1>
                            <p>HASH:&nbsp;<strong>{DataContainer && DataContainer.HASH?DataContainer.HASH.slice(0, 15) + '***':'No file.'}</strong></p>
                            <p>SOURCE:&nbsp;<strong>{DataContainer && DataContainer.SOURCE?DataContainer.SOURCE.slice(0, 18) + '...' : 'No Source.'}</strong></p>
                            <p>SIZE:&nbsp;<strong>{DataContainer && DataContainer.SIZE ?DataContainer.SIZE +'Kb':'0Kb' }</strong></p>
                        </div>
                        <div>
                            <ShieldIcon width={70} height={70} className = "shield-icon"/>
                        </div>
                    </div>
                </div>
                <div className="booking-data-main">
                    {
                        DataContainer && DataContainer["DISPLAY"]&& Object.entries(DataContainer["DISPLAY"]).length > 0 && Object.entries(DataContainer["DISPLAY"]).map(([keyMain,valueMain])=>{
                            return(
                                <div key={keyMain} className="booking-data-container">
                                    <div className="booking-data-container-header">
                                          <Ship width={40} height={40} className={'ship-logo'}/>
                                          <h1>{keyMain}</h1>
                                    </div>
                                    <div>
                                        {
                                            valueMain && Object.entries(valueMain).map(([keyContainer,valueContainer])=>{
                                                if(keyContainer.includes('DATE') || keyContainer.includes('TIME')) return;
                                                return(
                                                    <div key={keyContainer} className="booking-data-type">
                                                        <div className="booking-data-type-header">
                                                            <h1>Container:</h1>
                                                            <p>{keyContainer}</p>
                                                        </div>
                                                        <div className="booking-data-type-header">
                                                            <h1>Date:</h1>
                                                            <p>{valueMain?.['DATE'] ? valueMain?.['DATE']:'-'}</p>
                                                        </div>
                                                        <div>
                                                            <div className="booking-data-destination">
                                                                <BookingSection data={valueContainer} Forwarder={keyMain} Container={keyContainer}/>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
