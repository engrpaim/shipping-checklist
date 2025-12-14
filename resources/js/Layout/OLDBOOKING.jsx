/**
 * @returns Booking() Booking details per container
 *
 */

import React, { useEffect, useState ,useRef, useReducer} from 'react';
import { router } from '@inertiajs/react';
import * as XLSX from 'xlsx';
import '../../css/booking.css';
import {PickupDateLogo , DestinationLogo , TotalPalletLogo , ContainerLogo,BookLogo , RemoveLogo,  ExcelFileSvg,Nodata } from '../SVG/ShippingLogos';
export default function Booking() {
    /*UseRef*/
    const firstHold = useRef(false);
    const sameContainerHold = useRef(false);
    const displayData = useRef({});
    const currentKey = useRef(0);
    const compareForwarder = useRef(null);
    const forwarder= useRef(null);
    const destination = useRef(null);
    const totalPallet = useRef(0);
    const currentStart = useRef(false);
    const currentEnd = useRef(false);
    const currentType = useRef(false);
    const holdBoth = useRef(false);
    const [currentCount,setCurrentCount] = useState(null);

    /*Track State*/
    const [excelData, setExcelData] = useState(null);
    const [firstData, setFirstData] = useState(null);
    const [totalPalletDetect , setTotalPalletDetect] =useState(null);
    const [fileSource , setFileSource] =useState(null);
    const [sizeIdentifier , setSizeIdentifier] = useState(null);
    const [displayDataState, setDisplayDataState] = useState({});
    const [displaError , setDisplayError] = useState({});
    const [isDragging, setIsDragging] = useState(false);

    /*Detect file upload*/
    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if (!file) return;
        const fileSizeInKB = (file.size / 1024).toFixed(2);
        const reader = new FileReader();
        setSizeIdentifier(fileSizeInKB);
        reader.onload = (event) => {
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
                    const newKey = key.replace(/\s+/g, '_')
                                    .replace(/\./g, '1').replace(/\(/g, '2')
                                    .replace(/\)/g, '3');
                    newRow[newKey] = value;
                });
                return newRow;
            });

            setFileSource(file.name);
            setExcelData(cleanedData);
        };

        reader.readAsArrayBuffer(file);
        e.target.value = null;
    };

    /*Convert excel date to date*/
    function excelDateToJSDate(serial)
    {
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
    /*Convert excel time to time*/
    function excelTimeToHHMM(decimal)
    {
        const totalMinutes = Math.round(decimal * 24 * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    function getValidQuantity(index)
    {
        const data = excelData[index];
        const quantity = data && data.QUANTITY;
        return (quantity !== 'QUANTITY' && quantity !== '?' && quantity > 0) ? quantity : false;
    }

    function getTypeFilter(index)
    {
        const type = excelData[index] !== undefined ? excelData[index].AAATYPE.split(";") : null;
        if(!type) return;
        return type[0] ? type[0] : null;
    }

    function destinationHandle (destination,excelData,currentStart)
    {
        if(!excelData[currentStart]) return;
        const destinationCurrent = excelData[currentStart].DESTINATION  !== undefined && excelData[currentStart].DESTINATION !== '?'?  excelData[currentStart].DESTINATION: destination.current;
        if(! destinationCurrent)return;
        destination.current = destinationCurrent;
        return destinationCurrent  ? destinationCurrent :  null;
    }

    function getDate(index){
        if(!excelData[index])return null;
        const date = excelData[index].PICK_UP_DATE ?  excelData[index].PICK_UP_DATE : null;
        const newData = excelDateToJSDate(date);
        return newData;
    }

    function getTime(index){
        if(!excelData[index])return null;
        const time = excelData[index].PICK_UP_TIME ? excelData[index].PICK_UP_TIME :null;
        const newTime = excelTimeToHHMM(time);
        return newTime;
    }

    function updateDataSet({currentStart,key,currentEnd,forwarder,destination}){
          displayData.current[currentStart.current] = {
                                                        ...displayData.current[Number(key)],
                                                        'START': currentStart.current,
                                                        'END': currentEnd.current,
                                                        'CONTAINER':   currentStart.current ? getTypeFilter(currentStart.current): 'CONTAINER NOT FOUND',
                                                        'FORWARDER': forwarder.current ? forwarder.current: 'NOT FOUND',
                                                        'DESTINATION':  destinationHandle (destination,excelData,currentStart.current),
                                                        'PICK_UP': getDate(currentStart.current),
                                                        'PICK_TIME':getTime(currentStart.current),

                                                      };
    }

    function updateDataSetSpecial(key,keyEnd,forwarder,destination){
        console.log('CHECK 2 ',key);
          displayData.current[key] = {
                                        ...displayData.current[key],
                                        'START': key,
                                        'END':keyEnd,
                                        'CONTAINER':   key? getTypeFilter(key): 'CONTAINER NOT FOUND',
                                        'FORWARDER': forwarder.current ? forwarder.current: 'NOT FOUND',
                                        'DESTINATION':  destinationHandle (destination,excelData,currentStart.current),
                                        'PICK_UP': getDate(key),
                                        'PICK_TIME':getTime(key),
                                    };

    }
       function getForwarder( end ){
            console.log('FUNCTION FORWARDER: ', excelData[end+1].AAMODEL);
             if(excelData[end+1].AAMODEL !== 'MODEL' && excelData[end+1].AAMODEL !=='?' && excelData[end+1].QUANTITY === '?'){
                                 console.log('CHECKING NEW FORWARDER ',excelData[end+1].AAMODEL);
                                return excelData[end+1].AAMODEL;
                            }
    }
    function setDetails(key,value){
                    /**
                    *
                    * @returns Set of arrays per container
                    *
                    */

                    //Get Forwarder

                    if (value.AAATYPE === undefined && value.DESTINATION === undefined)return;

                    if( value.AAMODEL !== '?'&& forwarder.current !==  value.AAMODEL && value.BINVOICE_NO === '?' && !sameContainerHold.current  &&  compareForwarder.current === null){
                        console.log('FORWARDER ',key ,compareForwarder.current );
                        compareForwarder.current = value.AAMODEL;
                        forwarder.current = value.AAMODEL;
                    }

                     if( forwarder.current === compareForwarder.current && forwarder.current !== undefined){
                        console.log('CURRENT FORWARDER: ',forwarder.current);
                    }
                      if( forwarder.current !== compareForwarder.current &&  compareForwarder.current !== undefined){
                        console.log('FORWARDER NOT EQUAL: ', compareForwarder.current);
                        forwarder.current = compareForwarder.current;
                    }

                    if(!currentEnd.current && !currentStart.current  && !firstHold.current && value.AAATYPE !== '?' && value.ANO_PALLETS !== '?' && value.BINVOICE_NO !== '?' && typeof value.AAATYPE === 'string'&&value.AAATYPE !== 'TYPE' && !sameContainerHold.current && (value.AAATYPE.includes("FCL") || value.AAATYPE.includes("LCL"))){

                        currentStart.current = Number(key);
                        firstHold.current = true;
                        currentType.current = value.AAATYPE;

                    }

                    if(!currentEnd.current && currentStart.current && firstHold.current && typeof value.AAATYPE !== 'number' && value.AAATYPE !== '?' &&  currentStart.current !== Number(key)&& !sameContainerHold.current ){

                        if(value.AAMODEL === 'MODEL' && currentStart.current !== Number(key) ){
                            currentEnd.current = Number(key) - 2;
                        }else if (value.AAMODEL !== 'MODEL' && currentStart.current !== Number(key)){
                            currentEnd.current = Number(key) - 1;
                        }

                        if(currentEnd.current && value.AAATYPE !== "?"){
                            const newStartKey = Number(key);
                            console.log('START CHECK 2',key);
                            compareForwarder.current = getForwarder(currentEnd.current);
                            updateDataSet({currentStart , newStartKey,currentEnd , forwarder,destination})
                        }


                    }

                    if(currentEnd.current && !holdBoth.current){

                        holdBoth.current = true;

                        if(value.AAATYPE !== '?' && value.AAMODEL !== '?'){


                            let checkOneUp = Number(key) + 1;
                            let checkTwoUp = Number(key) + 2;

                            let currentCheck = getValidQuantity(Number(key));
                            let checkOneUpQty = getValidQuantity(checkOneUp);
                            let checkTwoUpQty = getValidQuantity(checkTwoUp);
                            console.log(Number(key));
                            if (currentCheck) {
                                 currentStart.current = Number(key);
                                 currentType.current = excelData[Number(key)].AAATYPE;
                            }else if (checkOneUpQty) {
                                 currentStart.current = Number(key) + 1 ;
                                 currentType.current = excelData[currentStart.current].AAATYPE;
                            }else if (checkTwoUpQty) {
                                currentStart.current = Number(key) + 2 ;
                                currentType.current = excelData[currentStart.current].AAATYPE;
                            }
                            sameContainerHold.current = true;
                            currentEnd.current =false;
                            holdBoth.current = false;

                        }


                    }



                    if(!currentEnd.current && currentStart.current && firstHold.current && value.AAATYPE === '?' && value.QUANTITY === '?' &&  currentStart.current !== Number(key) && sameContainerHold.current ){
                        console.log('START CHECK 1',key);
                        console.log(  getForwarder(Number(key)-1));

                        currentEnd.current = Number(key) - 1;
                        compareForwarder.current = getForwarder(currentEnd.current);
                        const setAsKey  = currentStart.current;
                        updateDataSet({currentStart , setAsKey,currentEnd , forwarder,destination});
                        sameContainerHold.current = false;
                        currentStart.current = false;
                        currentEnd.current = false;
                        firstHold.current = false;
                        holdBoth.current = false;
                        forwarder.current = false;
                    }

                      if(sameContainerHold.current && typeof value.AAATYPE !== 'number'  && ( value.AAATYPE.includes("FCL") || value.AAATYPE.includes("LCL") ) && value.QUANTITY !== 'QUANTITY' &&  value.QUANTITY !== '?' ){
                        if(key > currentStart.current){

                            console.log('END: ' , excelData[Number(key)].AAATYPE,key);
                            for(let i = 1; i < 10; i++){
                                if(typeof excelData[Number(key)-i].QUANTITY === 'number'){
                                     console.log('DIFFERECE TO END ' , i , 'KEY ', Number(key)-i);
                                     currentEnd.current = Number(key)-i;
                                     break;
                                }
                            }

                            compareForwarder.current = getForwarder(currentEnd.current);

                            const setAsKey  = currentStart.current;
                            updateDataSet({currentStart , setAsKey,currentEnd , forwarder,destination});
                            currentStart.current = Number(key);
                            console.log('NEXT START: ' ,Number(key)+1);
                        }
                    }

                    if(Number(key) == excelData.length - 1 ) {

                        for (let i = excelData.length - 1 ; i  > currentStart.current ; i--){
                            if(typeof excelData[Number(key) - i].QUANTITY === 'number'){
                                    const setAsEndkey = i;
                                    const setAsKey  =  currentStart.current;
                                    //function updateDataSetSpecial({currentStart,key,keyEnd,forwarder,destination})
                                    console.log('CHECK: ' ,Number(key) , 'NUMBER OF ROTATION ',i , 'START ',setAsKey,' END ',setAsEndkey, 'DESTINATION ',destination.current,'FORWARDER ',forwarder.current);
                                    updateDataSetSpecial(setAsKey,setAsEndkey,forwarder,destination)
                                    break;
                            }
                        }

                        // if(!currentEnd.current < currentEnd.current ){


                        //         const setAsKey  = currentEnd.current;
                        //         for (let i =  currentStart.current  ; i  <= excelData.length - 1 ; i++){
                        //                 if(typeof excelData[i].QUANTITY === 'number'){
                        //                         console.log(i);
                        //                     const setAsEndkey = i;
                        //                     //function updateDataSetSpecial({currentStart,key,keyEnd,forwarder,destination})
                        //                     console.log('CHECK: ' ,Number(key) , 'NUMBER OF ROTATION ',i , 'START ',setAsKey,' END ',setAsEndkey, 'DESTINATION ',destination.current,'FORWARDER ',forwarder.current);
                        //                     updateDataSetSpecial(setAsKey,setAsEndkey,forwarder,destination)
                        //                     break;
                        //                 }
                        //         }

                        // }
                    }
    }


    /*Handle file*/
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
            handleFileChange({ target: { files: [file] } });
        }
    };
    /*Buttons functions*/
    const bookedData = (e) => {
        console.log(e.currentTarget.value);
        console.log(excelData);
        console.log(displayData.current);
        const start = e.currentTarget.value.split("_")[0];
        const end = e.currentTarget.value.split("_")[1];
        console.log(start, "------" ,end);
        router.visit('/shipping-checklist/booking/save',{
            method:'post',
            data:
            {
                'excel':excelData,
                'start': Number(start),
                'end': Number(end),
            },

            onSucess:(page) => {
                console.log('Saving Data!');
            },
            onError: (errors) => {
                console.error('Error scanned:', errors);
            }
        });
    };

    const removeBooked = (e) => {
        const indexKey = Number(e.currentTarget.value.split("_")[0]);
        setDisplayDataState(prev => {
            const newData = { ...prev };
            delete newData[indexKey];
            return newData;
        });

    };

    useEffect(() => {

        if (!excelData || excelData.length === 0) return;

        displayData.current = {};
        firstHold.current = false;
        currentKey.current = 0;
        forwarder.current = null;
        sameContainerHold.current = false;
        currentStart.current = false;
        currentEnd.current = false;
        firstHold.current = false;
        holdBoth.current = false;
        forwarder.current = false
        setFirstData(null);
        setDisplayDataState(null);

        Object.entries(excelData).forEach(([key ,value])=>{
            setDetails(key,value);
        });

        Object.entries(displayData.current).forEach(([key])=>{
            const start = displayData.current[key].START;
            const end = displayData.current[key].END;
             let total = 0;
                const mapped =Array.from({ length:  end + 1  },(_, i) =>{
                    if(!excelData[i])return;
                    const numberOfPalllets = excelData[i].ANO_PALLETS !== undefined  ? excelData[i].ANO_PALLETS : null;
                    if(numberOfPalllets){
                        if(typeof(numberOfPalllets) !== 'string' && i >= start && i <= end){
                            total += numberOfPalllets;
                        }

                        if(i === end){
                            displayData.current[key] = {
                                                            ...displayData.current[key],
                                                            'TOTAL_PALLETS': total
                                                        };
                        }
                    }
                }
            );
        });

        Object.entries(displayData.current).forEach(([key , value])=>{

            if(key === 'undefined' || key === 'false'){

                 delete displayData.current[key];
            }
        });
        setDisplayDataState({ ...displayData.current });


        setDisplayError(Object.keys(displayData.current).length);


    },[excelData]);

    useEffect(() => {
        setTotalPalletDetect(totalPallet.current);
    },[totalPallet.current]);

    useEffect(()=>{
        setCurrentCount(Object.entries(displayDataState).length);
        if(currentCount === 1){
            console.log(currentCount);
            setCurrentCount(null);
            setFileSource(null);
            setExcelData(null);
        }
    },[displayDataState]);
    console.log(excelData);
    console.log(displayData);
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

            {excelData && excelData.length > 0 &&(


                Object.entries(displayDataState).flatMap(([key1, value1]) =>
                {

                    if (value1.START > 0 && value1.END > 0) {

                        const buttonValue = value1.START +"_"+value1.END;
                        const buttonContainer =String(value1.CONTAINER).replace(/ /g,"_");

                        const rows = Array.from({ length: value1.END - value1.START + 1 },(_, idx) => {
                        const i = value1.START + idx;

                        const row = excelData[i];
                        if (!row) return null;
                        const rawCarton = Number(row?.NO_OF_CARTON);
                        const carton = isNaN(rawCarton) ? '?' : Math.round(rawCarton);
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
                                {/* <div className='confirmModule'><h1>HELLO</h1></div> */}
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

            { currentCount === null &&(

                       <Nodata/>

            )}

            {displaError <= 0 && (
                console.log(displaError),
                <div className='error-display'>
                    <div className='error-header'>
                        <h1>Invalid Format: <strong>{fileSource}</strong></h1>
                    </div>
                </div>
            )}
      
        </div>
    );
}
