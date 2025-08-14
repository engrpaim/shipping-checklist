/**
 * @returns Booking() Booking details per container
 *
 */

import React, { useEffect, useState ,useRef} from 'react';
import * as XLSX from 'xlsx';
import '../../css/booking.css';
import {PickupDateLogo , DestinationLogo , TotalPalletLogo , ContainerLogo,BookLogo , RemoveLogo,  ExcelFileSvg } from '../SVG/ShippingLogos';
export default function Booking() {
    const firstHold = useRef(false);
    const containerRef = useRef(false);
    const displayData = useRef({});
    const currentKey = useRef(0);
    const forwarder= useRef(null);
    const destination = useRef(null);
    const totalPallet = useRef(0);
    const currentStart = useRef(false);
    const currentEnd = useRef(false);
    const currentType = useRef(false);
    const holdBoth = useRef(false);
    /*Track State*/
    const [excelData, setExcelData] = useState(null);
    const [firstData, setFirstData] = useState(null);
    const [totalPalletDetect , setTotalPalletDetect] =useState(null);
    const [fileSource , setFileSource] =useState(null);
    const [sizeIdentifier , setSizeIdentifier] = useState(null);

     /*Manipulate Excel file data*/
    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if (!file) return;
        const fileSizeInKB = (file.size / 1024).toFixed(2);
        const reader = new FileReader();
        setSizeIdentifier(fileSizeInKB);
        reader.onload = (event) => {
            const fullPath = e.target.value;
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const customHeaders = [
                "AAMODEL",
                "QUANTITY",
                "BINVOICE_NO",
                "INVOICE_DATE",
                "SHIP_TO",
                "DESTINATION",
                "AAATYPE",
                "PICK_UP_DATE",
                "PICK_UP_TIME",
                "QUANTITY_PER_CARTON",
                "NO_OF_CARTON",
                "PALLET_WIDTH",
                "ANO_PALLETS",
                "TOTAL_PALLET",
                "PLANT_AREA",
                "TOTAL_PALLET_MAIN",
                "TOTAL_PALLET_P7",
                "TOTAL_PALLET_P8"];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                  header: customHeaders,
                  defval: '?',
            });

            const cleanedData = jsonData.map(row => {
            const newRow = {};
            Object.entries(row).forEach(([key, value]) => {
                const newKey = key.replace(/\s+/g, '_') .replace(/\./g, '1').replace(/\(/g, '2').replace(/\)/g, '3');  // replace spaces with _
                newRow[newKey] = value;
            });
            return newRow;
            });

            setFileSource(fullPath.split('\\').pop());
            setExcelData(cleanedData);
        };

        reader.readAsArrayBuffer(file);
    };
    // console.log(excelData);\

    /*Detect Excel data and manipulate data*/
    function excelDateToJSDate(serial) {
        const excelEpochOffset = 25569;
        const utcMillis = (serial - excelEpochOffset) * 86400 * 1000;
        const date = new Date(utcMillis);

        return date.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    function excelTimeToHHMM(decimal) {
        const totalMinutes = Math.round(decimal * 24 * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        // Pad minutes to 2 digits
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }



    function setDetails(key,value){
                    /**
                    *
                    * @returns Set of arrays per container
                    *
                    */

                    //Get Forwarder


                    //console.log(forwarder.current + " ------- " + value.AAMODE);
                    let keyDynamic;
                    let endKeys;
                    let pickUpDate;
                    let pickUpTime;

                    if( value.AAMODEL !== '?'&& forwarder.current !==  value.AAMODEL && value.BINVOICE_NO === '?'){
                        forwarder.current= value.AAMODEL;
                        console.log("----FORWARDER: "+forwarder.current + " ------- VALUE: " + value.AAMODEL + "---- IN KEY: " + key);
                    }

                    if(!currentEnd.current && !currentStart.current  && !firstHold.current && value.AAATYPE !== '?' && value.ANO_PALLETS !== '?' && value.BINVOICE_NO !== '?' && value.AAATYPE !== 'TYPE'){

                        currentStart.current = Number(key);
                        console.log( "----- DATA START: " , currentStart.current);
                        firstHold.current = true;
                        currentType.current = value.AAATYPE;

                    }

                    if(!currentEnd.current && currentStart.current && firstHold.current && value.AAATYPE !== '?' &&  currentStart.current !== key ){

                        if(value.AAMODEL === 'MODEL' && currentStart.current !== Number(key) ){
                            currentEnd.current = key - 2;
                        }else if (value.AAMODEL !== 'MODEL' && currentStart.current !== Number(key)){
                            currentEnd.current = key - 1;
                        }

                        if(currentEnd.current && value.AAATYPE !== "?"){
                            console.log( "----- DATA END: " , currentEnd.current, "KEY ", key, " VALUE", value.AAATYPE);
                            displayData.current[currentStart.current] = {
                                                                ...displayData.current[key],
                                                                'START': currentStart.current ? currentStart.current: '?',
                                                                'END': currentEnd.current ? currentEnd.current: '?',
                            };

                        }

                         //console.log( "-----HOLD END : " , currentEnd.current);
                    }

                    if(currentEnd.current && !holdBoth.current){
                       // console.log('START',currentStart.current,'END:',currentEnd.current);
                    //    console.log(key);
                    //    holdBoth.current = true;
                    //    console.log(excelData[Number(key)].AAATYPE);
                    //    if(excelData[Number(key)].AAATYPE !== '?'){

                    //         currentStart.current = Number(key);
                    //         currentEnd.current
                    //         displayData.current[currentStart.current] = {
                    //                                             ...displayData.current[key],
                    //                                             'START': currentStart.current ? currentStart.current: '?',
                    //         };
                    //    }

                    }



                    //Get the start of the Item

                    // if( key > 0 && !firstHold.current && value.AAMODEL !== 'MODEL' && value.AAMODEL !== '?' && value.ANO_PALLETS !== '?' && value.QUANTITY !== '?' ){
                    //     setFirstData(value.AAATYPE);
                    //     if(!(Object.keys(displayData.current).length === 1)){
                    //         /*initial table*/
                    //         keyDynamic = currentKey.current = key;
                    //         pickUpDate = excelDateToJSDate(value.PICK_UP_DATE);
                    //         pickUpTime = excelTimeToHHMM(value.PICK_UP_TIME);
                    //         endKeys = currentKey.current - 1;
                    //         value.AAATYPE !== '?' ? containerRef.current =  value.AAATYPE : 'NOT FOUND';
                    //     }
                    //     else{
                    //         console.log('--------------------------------');
                    //         endKeys = currentKey.current -1;
                    //         keyDynamic = endKeys ;
                    //         containerRef.current =  excelData[key-1].AAATYPE;
                    //         pickUpTime = excelTimeToHHMM(excelData[key-1].PICK_UP_TIME);
                    //         pickUpDate = excelDateToJSDate(excelData[key-1].PICK_UP_DATE);
                    //         console.log('--------------------------------');
                    //     }
                    //     value.DESTINATION !== '?' ? destination.current =  value.DESTINATION: 'NOT FOUND';



                        displayData.current[currentKey.current] = {
                                                    ...displayData.current[key],
                                                    'CONTAINER': containerRef.current ? containerRef.current : 'NOT FOUND',
                                                    'START': Number(keyDynamic),
                                                    'FORWARDER':forwarder.current ? forwarder.current : 'INVALID',
                                                    'DESTINATION': destination.current  ?  destination.current  : 'NOT FOUND',
                                                    'PICK_UP': pickUpDate ?  pickUpDate : 'INVALID',
                                                    'PICK_TIME':pickUpTime ? pickUpTime :'INVALID',
                                                    'END' :  endKeys ?  endKeys : 0
                                                    };

                    //     firstHold.current = true;


                    // }

                    // //Get the end of the Item
                    // if(key > 1 && value.AAATYPE !== '?' && value.AAATYPE !== firstData && value.BINVOICE_NO !== '?'){
                    //      displayData.current[currentKey.current] = {
                    //                                                  ...displayData.current[currentKey.current],
                    //                                                  'END': key - 1
                    //                                                 };

                    //     if(!(key === currentKey.current)){

                    //         currentKey.current = key;
                    //         firstHold.current = false;

                    //     }



                    // }



    }


    useEffect(() => {



        if (!excelData ||excelData.length === 0) return;

        displayData.current = {};
        firstHold.current = false;
        currentKey.current = 0;
        forwarder.current = null;
        setFirstData(null);



        Object.entries(excelData).forEach(([key ,value])=>{
            setDetails(key,value);
        });



        Object.entries(displayData.current).forEach(([key])=>{
            const start = displayData.current[key].START;
            const end = displayData.current[key].END;
             let total = 0;
                const mapped =Array.from({ length:  end + 1  },(_, i) =>{
                    const numberOfPalllets = excelData[i].ANO_PALLETS;
                    if(numberOfPalllets){
                        if(typeof(numberOfPalllets) !== 'string' && i >= start && i <= end){
                            total += numberOfPalllets;
                        }

                        if(i = end){
                            displayData.current[key] = {
                                                            ...displayData.current[key],
                                                            'TOTAL_PALLETS': total
                                                        };
                        }
                    }
                }
            );
        });


        console.log(displayData);


    },[excelData]);

    useEffect(() => {
        setTotalPalletDetect(totalPallet.current);
    },[totalPallet.current]);

    /*output*/

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileChange({ target: { files: [file] } }); // Mimic input change
        }
    };

    const bookedData = (e) => {

        console.log(e.currentTarget.value);
        console.log(excelData);
        console.log(displayData.current);
    };

     const removeBooked = (e) => {

        console.log(e.currentTarget.value);

    };
    console.log(excelData);
    return (
        <div className='booking-compile'>

            <div className="file-uploader-container">
                <div
                    className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        id="excel-upload"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="excel-upload" className="upload-button">
                        Select or Drag File to Book
                    </label>
                </div>
            </div>

            {excelData && Object.keys(excelData > 0) &&(
                Object.entries(displayData.current).flatMap(([key1, value1]) =>
                {
                    if (value1.START > 0 && value1.END > 0) {
                        const buttonValue = value1.START +"_"+value1.END;
                        const buttonContainer =String(value1.CONTAINER).replace(/ /g,"_");

                        const rows = Array.from({ length: value1.END - value1.START + 1 },(_, idx) => {
                            const i = value1.START + idx;
                            const row = excelData[i];
                            if (!row) return null;
                            const carton = Math.round(row.NO_OF_CARTON);
                            const replaceSpace =String(value1.CONTAINER).replace(/ /g,"_");

                            return (
                                <tr key={`${key1}-${i}`} id={`${replaceSpace}_${i}`}>
                                    <td id={`model_${i}`} >{row.AAMODEL}</td>
                                    <td id={`quantity_${i}`}>{row.QUANTITY}</td>
                                    <td id={`invoice_${i}`}>{row.BINVOICE_NO}</td>
                                    <td id={`precarton_${i}`}>{row.QUANTITY_PER_CARTON}</td>
                                    <td id={`carton_${i}`}>{carton}</td>
                                    <td id={`palletw_${i}`}>{row.PALLET_WIDTH}</td>
                                    <td id={`palletno_${i}`}>{row.ANO_PALLETS }</td>
                                    <td id={`area_${i}`}>{row.PLANT_AREA}</td>
                                </tr>
                            );}).filter(Boolean);

                        return (
                                <React.Fragment key={key1}>
                                <div className='confirmModule'><h1>HELLO</h1></div>
                                    <div className='booking-data-sheet'>
                                        <div className='booking-title'>Booking Confirmation</div>
                                        <div className='booking-header'>
                                            <div className='booking-logo' >
                                                <ContainerLogo width={300} message={value1.CONTAINER}/>
                                            </div>
                                            <div className='booking-logo' >
                                                <TotalPalletLogo width={200} message={value1.TOTAL_PALLETS}/>
                                            </div>
                                            <div className='booking-logo'>
                                                <DestinationLogo width={300} message={value1.DESTINATION}/>
                                            </div>
                                            <div className='booking-logo'>
                                                <PickupDateLogo pickup_data={value1.PICK_UP+" | "+value1.PICK_TIME} width={400}/>
                                            </div>
                                        </div>
                                        <table className='booking-details'>
                                            <thead>
                                                <tr>
                                                    <th>MODEL</th>
                                                    <th>QUANTITY</th>
                                                    <th>INVOICE NUMBER</th>
                                                    <th>QUANTITY PER CARTON</th>
                                                    <th>NO. OF CARTON</th>
                                                    <th>PALLET WIDTH (MIDDLE)</th>
                                                    <th>NO. OF PALLETS</th>
                                                    <th>PLANT AREA</th>
                                                </tr>
                                            </thead>
                                            <tbody>{rows}</tbody>
                                        </table>
                                        <div className='button-combine'>
                                            <div className='button-file'>
                                                <ExcelFileSvg message={fileSource} size={sizeIdentifier}/>
                                            </div>
                                            <div className="button-container">
                                                <button className="book-logo" value={`${buttonValue}_add%${buttonContainer}`} onClick={bookedData}>
                                                    <BookLogo/>
                                                    <h1>BOOK</h1>
                                                </button>
                                                <button className="remove-icon" value={`${buttonValue}_remove%${buttonContainer}`} onClick={removeBooked}>
                                                    <RemoveLogo/>
                                                    <h1>REMOVE</h1>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                        );
                    }

                    return [];

                })

            )}




        </div>
    );
}
