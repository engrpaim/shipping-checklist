import { useApp } from "../Context/AppContext"
import { router } from "@inertiajs/react";
import '../../css/tablet.css';
import { useState } from "react";
import { QRIcon } from "../SVG/ShippingLogos";
export default function Queue(queueData){
    const [checker , setChecker] = useState(null);
    const [scannedId , setScannedId ] = useState(null);
    const [loadInvoice , setLoadInvoice] = useState([]);
    console.log('Queue: ',queueData);

    const handleScanId =(shipmentSerial)=> {

        setScannedId(shipmentSerial);
    }
    const handleCancel =()=>{
        setScannedId(null);
    }
    const handleInvoiceLoad =(invoice)=>{

        setLoadInvoice((prev)=>
                prev.includes(invoice) ?
                prev.filter((item)=> item !== invoice):
                [...prev,invoice]
        )

    }

    const handleDatagrabber =(ShipmentSerial , status)=>{
        console.log('Updating: ....',ShipmentSerial);
        if(!ShipmentSerial && !status) return;
        router.visit('/shipping-checklist/queue/mcups',{
            method:'post',
            data:{
                'ShipmentSerial' : ShipmentSerial,
                'Status' : status
            },
            preserveScroll:true,
            replace:false
        });
    }
    const handleLoad = (shipmentSerial, status) => {
        console.log('loading: ....', shipmentSerial, status);
        if (!shipmentSerial) return;

        router.post('/shipping-checklist/queue/mc', {
            load: shipmentSerial,
            status: status ?? 'BOOKED',
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: false,
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
                column:column??null
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
                                        <h1>Date</h1>
                                        <p>{value["Pickup_Date"]}</p>
                                    </div>
                                    <div className="tablet-details">
                                        <h1>Time</h1>
                                        <p>{value["Pickup_time"]}</p>
                                    </div>
                                    <div className="tablet-details">
                                        <h1>Forwarder</h1>
                                        <p>{value["Forwarder"]}</p>
                                    </div>
                                    <div className="tablet-details">
                                        <h1>Type</h1>
                                        <p>{value["Type"].split(';')[0]}</p>
                                    </div>
                                </div>
                                <div className="table-wrapper">
                                    <table className="tablet-table">
                                        <thead>
                                            <tr>
                                                <th>Model</th>
                                                <th>Invoice Number</th>
                                                <th>Quantity</th>
                                                <th>Quantity Per Carton</th>
                                                <th>Carton Number</th>
                                                <th>Pallet Width</th>
                                                <th>Number of Pallets</th>
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
                                                    const statusScan = scannedId && scannedId.includes(key);

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
                                                                                type="checkbox" disabled={!( scannedId && scannedId.includes(key))} onChange={()=>{handleInvoiceLoad(invoice)}}
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
                                                                        disabled={!(data["Checked_by"] && scannedId && scannedId.includes(key))}
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
                                    scannedId  && scannedId.includes(key)?
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
                                                    :value["Shipment_Status"] === 'LOADING' && isCounted > 0 ?<button className="ship-btn" onClick={()=>{handleDatagrabber(key ,'SHIPPED')}}>SHIPPED</button>
                                                    :null
                                                }
                                                {
                                                    value["Shipment_Status"] !== 'SHIPPED' &&
                                                    <>
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
    </>
    )
}
