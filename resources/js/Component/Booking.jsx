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
    const sameContainerHold = useRef(false);
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
    const [displayDataState, setDisplayDataState] = useState({});
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

    function getValidQuantity(index) {
                            const data = excelData[index];
                            console.log(data.QUANTITY);
                            const quantity = data && data.QUANTITY;
                            return (quantity !== 'QUANTITY' && quantity !== '?' && quantity > 0) ? quantity : false;
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

                    if( value.AAMODEL !== '?'&& forwarder.current !==  value.AAMODEL && value.BINVOICE_NO === '?' && !sameContainerHold.current){
                        forwarder.current= value.AAMODEL;
                        console.log("----FORWARDER: "+forwarder.current + " ------- VALUE: " + value.AAMODEL + "---- IN KEY: " + key);
                    }

                    if(!currentEnd.current && !currentStart.current  && !firstHold.current && value.AAATYPE !== '?' && value.ANO_PALLETS !== '?' && value.BINVOICE_NO !== '?' && value.AAATYPE !== 'TYPE' && !sameContainerHold.current && (value.AAATYPE.includes("FCL") || value.AAATYPE.includes("LCL"))){

                        currentStart.current = Number(key);
                        console.log( "----- DATA START: " , currentStart.current);
                        firstHold.current = true;
                        currentType.current = value.AAATYPE;

                    }

                    if(!currentEnd.current && currentStart.current && firstHold.current && value.AAATYPE !== '?' &&  currentStart.current !== Number(key)&& !sameContainerHold.current ){

                        if(value.AAMODEL === 'MODEL' && currentStart.current !== Number(key) ){
                            currentEnd.current = Number(key) - 2;
                        }else if (value.AAMODEL !== 'MODEL' && currentStart.current !== Number(key)){
                            currentEnd.current = Number(key) - 1;
                        }

                        if(currentEnd.current && value.AAATYPE !== "?"){
                            console.log( "----- DATA END: " , currentEnd.current, "KEY ", Number(key), " VALUE", value.AAATYPE);
                            displayData.current[currentStart.current] = {
                                                                ...displayData.current[Number(key)],
                                                                'START': currentStart.current ? currentStart.current: '?',
                                                                'END': currentEnd.current ? currentEnd.current: '?',
                                                                'CONTAINER': 'NOT FOUND',
                                                                'FORWARDER': 'INVALID',
                                                                'DESTINATION': 'NOT FOUND',
                                                                'PICK_UP': 'INVALID',
                                                                'PICK_TIME':'INVALID',

                            };

                            // currentStart.current = null;
                            // currentEnd.current = null;
                            // firstHold.current = false;
                            // holdBoth.current = false;

                        }

                         //console.log( "-----HOLD END : " , currentEnd.current);
                    }

                    if(currentEnd.current && !holdBoth.current){
                        holdBoth.current = true;//Hold if strat and end is set
                        console.log('Evaluate Current Row------', key);
                        //Detect if same forwarder
                        if(value.AAATYPE !== '?' && value.AAMODEL !== '?'){

                            console.log('PASSED CONDITION');
                            let checkOneUp = Number(key) + 1;
                            let checkTwoUp = Number(key) + 2;
                            // console.log('CURRENT POSITION:',excelData[currentStart.current] && excelData[currentStart.current ].QUANTITY ?excelData[ currentStart.current].QUANTITY: null);
                            // console.log('CHECK UP 1: ',excelData[checkOneUp] && excelData[checkOneUp].QUANTITY ?excelData[checkOneUp].QUANTITY: null);
                            // console.log('CHECK UP 2: ',excelData[checkTwoUp] && excelData[checkTwoUp].QUANTITY? excelData[checkTwoUp].QUANTITY:null);

                            let currentCheck = getValidQuantity(Number(key));
                            let checkOneUpQty = getValidQuantity(checkOneUp);
                            let checkTwoUpQty = getValidQuantity(checkTwoUp);

                            if (currentCheck) {
                                 console.log("Current: ",excelData[ currentStart.current].QUANTITY, "Key: ",key);
                                 currentStart.current = Number(key);
                            }else if (checkOneUpQty) {
                                 console.log("One up: ",excelData[checkOneUp].QUANTITY,"Key: ",key," --->",Number(key) + 1);
                                 currentStart.current = Number(key) + 1 ;
                            }else if (checkTwoUpQty) {
                                console.log("Two up: ",excelData[checkTwoUp].QUANTITY,"Key: ",key," --->",Number(key) + 2);
                                currentStart.current = Number(key) + 2 ;
                            }
                            sameContainerHold.current = true;
                            currentEnd.current =false;
                            holdBoth.current = false;
                        }

                          console.log('START SAME FORWADER DIFFERENT CONTAINER -->',currentStart.current,'---------',key,'------>',value.QUANTITY) ;
                    }



                    if(!currentEnd.current && currentStart.current && firstHold.current && value.AAATYPE === '?' && value.QUANTITY === '?' &&  currentStart.current !== Number(key) && sameContainerHold.current ){
                        currentEnd.current = Number(key) - 1;
                        console.log('END SAME FORWADER DIFFERENT CONTAINER -->',currentEnd.current);
                        displayData.current[currentStart.current] = {
                                                                ...displayData.current[currentStart.current],
                                                                'START': currentStart.current ? currentStart.current: '?',
                                                                'END': currentEnd.current ? currentEnd.current: '?',
                                                                'CONTAINER': 'NOT FOUND',
                                                                'FORWARDER': 'INVALID',
                                                                'DESTINATION': 'NOT FOUND',
                                                                'PICK_UP': 'INVALID',
                                                                'PICK_TIME':'INVALID',

                        };
                        console.log('-------------------------RESET-------------------------------------');
                        sameContainerHold.current = false;
                        currentStart.current = false;
                        currentEnd.current = false;
                        firstHold.current = false;
                        holdBoth.current = false;
                        forwarder.current = false;
                    }

                      if(sameContainerHold.current && ( value.AAATYPE.includes("FCL") || value.AAATYPE.includes("LCL") ) && value.QUANTITY !== 'QUANTITY' &&  value.QUANTITY !== '?' ){
                        if(key > currentStart.current){
                            console.log('STEP DOWN 1 ARRAY END: ' ,key - 1);
                            currentEnd.current = Number(key) - 1;
                            displayData.current[currentStart.current] = {
                                                                ...displayData.current[currentStart.current],
                                                                'START': currentStart.current ? currentStart.current: '?',
                                                                'END': currentEnd.current ? currentEnd.current: '?',
                                                                'CONTAINER': 'NOT FOUND',
                                                                'FORWARDER': 'INVALID',
                                                                'DESTINATION': 'NOT FOUND',
                                                                'PICK_UP': 'INVALID',
                                                                'PICK_TIME':'INVALID',

                            };
                            console.log('ARRAY START: ' ,key);
                            currentStart.current = Number(key);
                        }
                    }

                    if(Number(key) == excelData.length - 1 ) {
                        console.log('see START: ' ,Number(key) == excelData.length - 1 ) ;
                        for (let i = excelData.length - 1 ; i  > currentStart.current ; i--){
                            if(excelData[i].QUANTITY !== '?' && excelData[i].QUANTITY !== 'QUANTITY'){
                                    currentEnd.current = i;

                                    displayData.current[i] = {
                                                                    ...displayData.current[currentStart.current],
                                                                    'START': currentStart.current ? currentStart.current: '?',
                                                                    'END': currentEnd.current ? currentEnd.current: '?',
                                                                    'CONTAINER': 'NOT FOUND',
                                                                    'FORWARDER': 'INVALID',
                                                                    'DESTINATION': 'NOT FOUND',
                                                                    'PICK_UP': 'INVALID',
                                                                    'PICK_TIME':'INVALID',

                                    };
                            }
                        }

                        if(!currentEnd.current < currentEnd.current ){
                               currentEnd.current = currentStart.current;

                                displayData.current[currentStart.current] = {
                                                                ...displayData.current[currentStart.current],
                                                                'START': currentStart.current ? currentStart.current: '?',
                                                                'END': currentStart.current? currentStart.current: '?',
                                                                'CONTAINER': 'NOT FOUND',
                                                                'FORWARDER': 'INVALID',
                                                                'DESTINATION': 'NOT FOUND',
                                                                'PICK_UP': 'INVALID',
                                                                'PICK_TIME':'INVALID',

                                };
                        }
                    }
    }

    console.log(displayData.current);
    console.log(excelData);

    useEffect(() => {



        if (!excelData || excelData.length === 0) return;

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

         setDisplayDataState({ ...displayData.current });



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

    console.log(displayData.current);
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




        </div>
    );
}
