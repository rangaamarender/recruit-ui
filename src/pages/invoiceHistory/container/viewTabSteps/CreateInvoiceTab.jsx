import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import raveslogo from "../../../../assets/images/raveslogo.png";
import html2pdf from 'html2pdf.js';

import 'jspdf-autotable';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const dataTableColumns = [
    { field: "sno", header: "#" },
    { field: "workername", header: "Worker Name" },
    { field: "description", header: "Description" },
    { field: "antHrs", header: "Ant. Hrs" },
    { field: "actHrs", header: "Act. Hrs" },
    { field: "billRate", header: "Bill Rate" },
    { field: "amount", header: "Amount" },
];

const dataTableData = [
    {
        id: 1,
        sno: 1,
        workername: "John Doe",
        description: "Task 1",
        antHrs: 10,
        actHrs: 10,
        billRate: 50,
        amount: 500
    },
    {
        id: 2,
        sno: 2,
        workername: "Jane Smith",
        description: "Task 2",
        antHrs: 20,
        actHrs: 10,
        billRate: 50,
        amount: 500

    },
];

function CreateInvoiceTab({ rowData }) {
    const data = rowData?.data || {};

    const handlePrint = () => {
        const printContent = document.querySelector('.container');
        const printWindow = window.open('', '_blank');

        const styles = Array.from(document.styleSheets)
            .map(styleSheet => {
                try {
                    return Array.from(styleSheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('\n');
                } catch (e) {
                    console.log('Error:', e);
                    return '';
                }
            })
            .join('\n');

        printWindow.document.write(`
            <html>
                <head>
                    <style>${styles}</style>
                </head>
                <body class="ps-4 pe-4">
                    <div class="print-content">
                        ${printContent.innerHTML}
                    </div>
                </body>
            </html>
        `);

        printWindow.document.close();
        const elements = printWindow.document.querySelectorAll('*');
        elements.forEach(el => {
            el.style.pageBreakInside = 'avoid';
        });
        printWindow.print();
    };


    // const handlePrint = () => {
    //     const printContent = document.querySelector('.container');
    //     const printWindow = window.open('', '_blank');

    //     // Get the styles from your React component
    //     const styles = Array.from(document.styleSheets)
    //         .map(styleSheet => {
    //             try {
    //                 return Array.from(styleSheet.cssRules)
    //                     .map(rule => rule.cssText)
    //                     .join('\n');
    //             } catch (e) {
    //                 console.log('Error:', e);
    //                 return '';
    //             }
    //         })
    //         .join('\n');

    //     // Write the content and styles to the new window
    //     printWindow.document.write(`
    //         <html>
    //             <head>
    //                 <style>${styles}</style>
    //             </head>
    //             <body class="ps-4 pe-4">
    //                 <div class="print-content">
    //                     ${printContent.innerHTML}
    //                 </div>
    //             </body>
    //         </html>
    //     `);

    //     printWindow.document.close();
    //     printWindow.print();
    // };

    const handleDownloadPDF = () => {
        const element = document.querySelector('.container');
        // Add styles to create space at the top and bottom of each page
        const elements = element.querySelectorAll('*');
        elements.forEach(el => {
            el.style.pageBreakInside = 'avoid';
        });

        const invoiceNumber = 'LRIN-004567';
        const fileName = `invoice_${invoiceNumber}.pdf`;

        html2pdf()
            .from(element)
            .toPdf()
            .get('pdf')
            .then(pdf => {
                pdf.save(fileName);

                // Reset added styles after generating the PDF
                elements.forEach(el => {
                    el.style.pageBreakInside = '';
                });
            });
    };

    // const handleDownloadPDF = () => {
    //     const element = document.querySelector('.container');

    //     // Add padding styles directly to the elements within the container
    //     const elements = element.querySelectorAll('*');
    //     elements.forEach(el => {
    //         el.style.paddingLeft = '8px';
    //         el.style.paddingRight = '8px';
    //     });

    //     const invoiceNumber = 'LRIN-004567'; // Replace this with the actual invoice number
    //     const fileName = `invoice_${invoiceNumber}.pdf`;

    //     html2pdf()
    //         .from(element)
    //         .toPdf()
    //         .get('pdf')
    //         .then(pdf => {
    //             pdf.save(fileName);

    //             // Remove added styles after generating PDF
    //             elements.forEach(el => {
    //                 el.style.paddingLeft = '';
    //                 el.style.paddingRight = '';
    //             });
    //         });
    // };





    // const handleDownloadPDF = () => {
    //     // Replace with our container class
    //     const element = document.querySelector('.container');

    //     html2pdf()
    //         .from(element)
    //         .save('invoice.pdf');
    // };

    return (
        <>
            <div className='mx-2'>
                {Object.keys(data).length > 0 && (
                    <div className="container">
                        {/* Print and Download Buttons */}
                        <div className="row mb-2">
                            <div className="col-12 mt-0 text-end">
                                <Button type="button" security='secondary' icon='pi pi-print' label='Print' size='small' className="company-secondary-btn me-2" onClick={handlePrint} />
                                <Button type="button" security='secondary' icon='pi pi-arrow-down' label='Download' size='small' className="company-secondary-btn" onClick={handleDownloadPDF} />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-12 text-center">
                                <img src={raveslogo} className='cursor-pointer' alt="Company Logo" />
                            </div>
                        </div>

                        {/* Invoice Header */}
                        <div className="row mb-2">
                            <div className="col-9">
                                <span>INVOICE TO</span>
                                <h4>David Warner{data.name}</h4>
                            </div>
                            {/* <div className="col-4">
                                <span>Date: {data.invoiceNumber}</span>
                                <h6>18 Aug, 2023 02:36PM</h6>
                            </div> */}
                            <div className="col-3">
                                <h4>INVOICE</h4>
                                <h6> <span>Invoice No: </span> <span>LRIN-004567</span>{data.invoiceDate}</h6>
                            </div>
                        </div>

                        {/* Company Address */}
                        <div className="row mb-2">
                            <div className="col-8">
                                <span>Address:</span>
                                <h6>Company Name</h6>
                                <h6>Address Line 1</h6>
                                <h6>City, State, ZIP</h6>
                            </div>
                            {/* <div className="col-4">
                                <span>Total Amount</span>
                                <h6>$1000 </h6>
                            </div> */}
                        </div>

                        {/* Bill To */}
                        {/* <div className="row mb-2">
                            <div className="col-8">
                                <span>Bill To:</span>
                                <h6>Address Line 1</h6>
                                <h6>City, State, ZIP</h6>
                            </div>
                            <div className="col-4">
                                <span>Total Amount</span>
                                <h5 className='mb-3'>$1000 </h5>
                                <span className=' p-1 text-danger border-opacity-25 border border-danger rounded-3'>Due on Jun 15, 2023 </span>
                            </div>
                        </div> */}

                        {/* Data Table */}
                        <div className="row">
                            <div className="col-12">
                                <DataTable value={dataTableData}>
                                    {dataTableColumns.map((column) => (
                                        <Column
                                            key={column.field}
                                            field={column.field}
                                            header={column.header}
                                        />
                                    ))}
                                </DataTable>
                            </div>
                        </div>
                        {/* Grand Total */}
                        <div className="col-12 mb-2">
                            <div className="d-flex justify-content-end gap-5 align-items-center pb-2">
                                <div>
                                    <span>Sub Total:</span>
                                </div>
                                <div>
                                    <span>$1000</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-5 align-items-center">
                                <div>
                                    <span className="me-2">Estimated Tax (10%):</span>
                                </div>
                                <div>
                                    <span>$1000</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-5 align-items-center">
                                <div>
                                    <span className="me-2">Discount (10%):</span>
                                </div>
                                <div>
                                    <span>$100</span>
                                </div>
                            </div>
                            <div className="d-flex fw-bold justify-content-end gap-4 align-items-center mt-3 pt-2 pb-2 border-top-1 border-secondary border-opacity-25 border-bottom-3">
                                <div>
                                    <span className="me-1">Grand Total:</span>
                                </div>
                                <div>
                                    <span>$1000</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="row">
                            <div className="col-12">
                                <span>Payment Details:</span>
                                <h6>Payment Method : Mastercard</h6>
                                <h6>Card Holder : David Warner</h6>
                                <h6>Card Number : XXXX XXXX XXXX 1234</h6>
                                <h6>Total Amount : $1000</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className='text-justify invoice-note-bg rounded-1 p-3'>
                                    <b>NOTES: </b> All accounts are to be paid within 7 days from receipt of invoice.
                                    To be paid by cheque or credit card or direct payment online.
                                    If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CreateInvoiceTab;
