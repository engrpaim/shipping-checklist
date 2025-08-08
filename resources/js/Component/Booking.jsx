import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../../css/booking.css';
export default function Booking() {
    const [excelData, setExcelData] = useState([]);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const customHeaders = [
                "MODEL",
                "QUANTITY",
                "INVOICE_NO",
                "INVOICE_DATE",
                "SHIP_TO",
                "DESTINATION",
                "1TYPE",
                "PICK_UP_DATE",
                "PICK_UP_TIME",
                "QUANTITY_PER_CARTON",
                "NO_OF_CARTON",
                "PALLET_WIDTH",
                "NO_PALLETS",
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


            setExcelData(cleanedData);
        };

        reader.readAsArrayBuffer(file);
    };
    console.log(excelData);


    return (
        <div>
            <h2>Upload Excel File</h2>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />

            {
                excelData &&
                (
                    <>
                        <div>
                            <table className='booking-table'>
                                <thead>
                                    <tr>
                                        <td>MODEL</td>
                                        <td>QUANTITY</td>
                                        <td>INVOICE&nbsp;NO.</td>
                                        <td>DESTINATION</td>
                                        <td>TYPE</td>
                                        <td>PICK&nbsp;UP&nbsp;DATE</td>
                                        <td>QUANTITY&nbsp;PER&nbsp;CARTON</td>
                                        <td>NO.&nbsp;OF&nbsp;CARTON</td>
                                        <td>PALLET&nbsp;WIDTH&nbsp;(MIDDLE)</td>
                                        <td>NO.&nbsp;OF&nbsp;PALLETS</td>
                                        <td>PLANT&nbsp;AREA</td>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }
        </div>
    );
}
