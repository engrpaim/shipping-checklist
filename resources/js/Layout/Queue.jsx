import { useApp } from "../Context/AppContext"
import { router } from "@inertiajs/react";
import '../../css/tablet.css';
import { useState ,useEffect , useRef} from "react";
import { QRIcon ,CameraIcon ,CloseIcon} from "../SVG/ShippingLogos";
import Webcam from "react-webcam";
import jsQR from "jsqr";
export default function Queue(queueData){
    const [checker , setChecker] = useState(null);
    const [scannedId , setScannedId ] = useState(null);
    const [loadInvoice , setLoadInvoice] = useState([]);
    const [isPictureExist , setIsPictureExist] = useState(null);
    const [openCamera , setOpenCamera] = useState(null);
    const [shipmentSerialSte, setShipmentSerial] = useState(null);
    const [captureImage ,setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const canvasRef = useRef(null);
    useEffect(() => {
        if (!openCamera) return;
        let scanInterval = null;
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: "environment" } },
                    audio: false,
                });

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                if (openCamera === "SCAN ID") {
                    scanInterval = setInterval(() => {
        if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                // This is the actual scanned QR content:
                const name = code.data.split(";")[2];
                setScannedId(name);
                setOpenCamera(null);
                // Optional: stop scanning after first detection
                // clearInterval(scanInterval);
            }
        }
    }, 300);
                }
            } catch (err) {
                alert(err.name + ': ' + err.message);
            }
        }

        startCamera();

        return () => {
             if (scanInterval) clearInterval(scanInterval);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(t => t.stop());
                streamRef.current = null;
            }
        };
    }, [openCamera]);


    const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL("image/png");

   setCapturedImage(imageBase64);

    setIsPictureExist(true);

    // OPTIONAL
    // setOpenCamera(null);
};

    const handleScanId =(shipmentSerial)=> {
        setOpenCamera('SCAN ID');
        setShipmentSerial(shipmentSerial);
        setScannedId(null);
    }
    const handleCancel =()=>{
        setScannedId(null);
        setShipmentSerial(null);
    }
    const handleInvoiceLoad =(invoice)=>{

        setLoadInvoice((prev)=>
                prev.includes(invoice) ?
                prev.filter((item)=> item !== invoice):
                [...prev,invoice]
        )

    }
    const handleCameraOpen =(shipment)=>{
        console.log('CAMERA OPEN:' , shipment);
        setOpenCamera(shipment);
    }
    const handleCloseCamera=(shipment)=>{
        setOpenCamera(null);
    }
    const handleDatagrabber =(ShipmentSerial , status)=>{
        console.log('Updating: ....',ShipmentSerial);
        if(!ShipmentSerial && !status) return;
        router.visit('/shipping-checklist/queue/mcups',{
            method:'post',
            data:{
                'ShipmentSerial' : ShipmentSerial,
                'Status' : status,
                'Name': scannedId
            },
            preserveScroll:true,
        });
    }
    const handleLoad = (shipmentSerial, status) => {
        console.log('loading: ....', shipmentSerial, status);
          console.log('CSRF Token:', document.querySelector('meta[name="csrf-token"]')?.content);
        if (!shipmentSerial) return;

        router.post('/shipping-checklist/queue/mc', {
            load: shipmentSerial,
            status: status ?? 'BOOKED',
            name: scannedId
        }, {
            preserveState: true,
            preserveScroll: true,
        });


    };



    const handleUnload=(invoice,column)=>{
        if(!invoice && !loadInvoice) return;
        setLoadInvoice((prev)=>
                prev.includes(invoice) ?
                prev.filter((item)=> item !== invoice):
                [...prev,invoice]);
        router.visit('/shipping-checklist/queue/mcu',{
            method:'post',
            data:{
                invoice:invoice??null,
                column:column??null,
                name: scannedId
            },
            preserveState:true,
            preserveScroll:true,
            replace:true
        });
    }

    return(
        <>
            <div className="tablet-container">
                    <div className="tablet-introduction">
                        <h1>Booking Queueing</h1>
                        <p>View all confirmed bookings that are ready for loading operations.</p>
                    </div>
                {
                    queueData&& queueData["data"] && Object.entries(queueData["data"]).map(([key,value,index])=>{
                        let countTotal = 0;
                        let countRow = 0;
                        let isCounted = 0;
                        let isChecked = 0;
                        return(
                            <div className="tablet-data" key={index}>



                                  <div className="tablet-header" >
                                    <div className="tablet-details-shipment">
                                        <h1>Shipment Serial</h1>
                                        <p>{key}</p>
                                    </div>
                                    <div className="tablet-details">
                                        <h1>Destination</h1>
                                        <p>{value["Destination"]}</p>
                                    </div>
                                     <div className="tablet-details">
                                        <h1>Forwarder</h1>
                                        <p>{value["Forwarder"]}</p>
                                    </div>
                                    <div className="tablet-details">
                                        <h1>Type</h1>
                                        <p>{value["Type"].split(';')[0]}</p>
                                    </div>

                                    <div className="tablet-details">
                                        <h1>Date & Time</h1>
                                        <p>{value["Pickup_Date"]} {value["Pickup_time"]}</p>
                                    </div>
                                </div>
                                <div className="table-wrapper">
                                    <table className="tablet-table">
                                        <thead>
                                            <tr>
                                                <th>Model</th>
                                                <th>Invoice Number</th>
                                                <th>Qty</th>
                                                <th>Qty Per Carton</th>
                                                <th>Carton #</th>
                                                <th>Pallet Width</th>
                                                <th># of Pallets</th>
                                                <th>Plant</th>
                                                <th>Check</th>
                                                <th>Count</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                value["details"] && Object.entries(value["details"]).map(([invoice,data,index])=>{
                                                    countTotal += data["Pallet_Number"];
                                                    data["Counted_By"]  !== null ? isCounted += data["Pallet_Number"]:null;
                                                    data["Checked_by"]  !== null ? isChecked += data["Pallet_Number"]:null;
                                                    countRow++;
                                                    const statusScan = scannedId && shipmentSerialSte.includes(key);

                                                    return(
                                                        <tr style={{ background: countRow % 2 === 0? '#FFFAE6':'none' }}>
                                                            <td>{data["Model"]}</td>
                                                            <td>{invoice}</td>
                                                            <td>{data["Quantity"]}</td>
                                                            <td>{data["QuantityePerCarton"]}</td>
                                                            <td>{data["Carton_Number"]}</td>
                                                            <td>{data["Pallet_Width"]}</td>
                                                            <td>{data["Pallet_Number"]}</td>
                                                            <td>{data["Plant"]}</td>
                                                            <td>
                                                                {
                                                                    !data["Checked_by"] &&  value["Shipment_Status"] === 'BOOKED' ?
                                                                        <label className="switch">
                                                                            <input
                                                                                type="checkbox" disabled={!( scannedId && shipmentSerialSte.includes(key))} onChange={()=>{handleInvoiceLoad(invoice)}}
                                                                            />
                                                                            <span className="slider" ></span>
                                                                        </label>
                                                                    :
                                                                    <div className="unload-container">
                                                                        <h1>{data["Checked_by"]}</h1>
                                                                       {
                                                                        value["Shipment_Status"] !== 'LOADING' &&
                                                                            <button
                                                                                onClick={()=>{handleUnload(invoice,'Checked_by')}}
                                                                                disabled={!(statusScan)}
                                                                                style ={{ background: !statusScan ? 'gray':null }}>Unload</button>
                                                                       }
                                                                    </div>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                     !data["Counted_By"] &&  value["Shipment_Status"] === 'LOADING' ?
                                                                     <label className="switch">
                                                                        <input
                                                                            type="checkbox"
                                                                            onChange={()=>{handleInvoiceLoad(invoice)}}
                                                                            disabled={!(data["Checked_by"] && scannedId && shipmentSerialSte.includes(key))}
                                                                        />
                                                                        <span className="slider"></span>
                                                                    </label>:<div className="unload-container">
                                                                        <h1>{data["Counted_By"]}</h1>
                                                                       {
                                                                            value["Shipment_Status"] === 'LOADING' &&
                                                                            <button
                                                                                onClick={()=>{handleUnload(invoice,'Counted_By')}}
                                                                                disabled={!(statusScan)}
                                                                                style ={{ background: !statusScan ? 'gray':null }}>Unload</button>
                                                                       }
                                                                    </div>

                                                                }
                                                            </td>
                                                            <td>{data["Status"]}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    scannedId  && shipmentSerialSte.includes(key)?
                                    <div className="scan-container">
                                        <div className="loaded-container">
                                            <div>
                                                <h1>Checked Pallet</h1>
                                                <p>{isChecked}</p>
                                            </div>
                                            <div>
                                                <h1>Counted Pallet</h1>
                                                <p>{isCounted}</p>
                                            </div>
                                            <div>
                                                <h1>Total Pallet</h1>
                                                <p>{countTotal}</p>
                                            </div>
                                            <div className="btn-container">
                                                {
                                                     value["Shipment_Status"] === 'BOOKED' ?<button className="ship-btn" onClick={()=>{handleDatagrabber(key ,'LOADING')}}>CHECKED</button>
                                                    :value["Shipment_Status"] === 'LOADING' && isCounted > 0  && isPictureExist?<button className="ship-btn" onClick={()=>{handleDatagrabber(key ,'SHIPPED')}}>SHIPPED</button>
                                                    :null
                                                }
                                                {
                                                    value["Shipment_Status"] !== 'SHIPPED' &&
                                                    <>
                                                        <button className="camera-btn" onClick={()=>{handleCameraOpen(key)}}>CAMERA<CameraIcon color="#ffffff"/></button>
                                                        <button className="confirm-btn" onClick={()=>{handleLoad(loadInvoice,value["Shipment_Status"])}}>LOAD</button>
                                                        <button className="cancel-btn" onClick ={()=>{handleCancel()}}>CANCEL</button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>:
                                    <div className="scan-container">
                                        <div className="scan-camera">
                                            <button onClick={()=>{handleScanId(key)}}>
                                                <p>Scan to start <strong>Loading!</strong></p>
                                                <QRIcon  width ={50} height = {50} fill={'#191400'}/>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                openCamera  &&
                <div className="photo-container">
                    <div className="photo-data">
                        <button  className="photo-click" onClick={()=>{handleCloseCamera()}}><CloseIcon size={15} color="#DE3818"/></button>
                        <div className="photo-title">
                            {openCamera &&  openCamera !== 'SCAN ID' ? <h1>CAPTURING&nbsp;{openCamera}</h1>: <h1>{openCamera}</h1>}
                        </div>
                        <div className="photo-captured">
                            <div className="photo-display">
                              <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    style={{ width: '650px', height: '400px', background: '#000' }}
                                />
                                  {
                                       captureImage && <div className="captured-container">
                                  <img
                                                            src={captureImage}
                                                            alt="Captured"

                                                            />

                                </div>
                                }
                                {
                                     openCamera !== 'SCAN ID' &&
                                    <div >
                                        <button className="capture-btn" onClick={()=>{handleCapture()}} ><CameraIcon size={35} color="#ffffff"/></button>
                                    </div>
                                }
                            </div>
                             <canvas ref={canvasRef} style={{ display: "none" }} />
                        </div>
                    </div>
                </div>
            }
    </>
    )
}
