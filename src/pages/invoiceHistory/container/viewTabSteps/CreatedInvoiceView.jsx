import html2pdf from 'html2pdf.js';
import 'jspdf-autotable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import raveslogo from '../../../../assets/images/raveslogo.png';

const dataTableColumns = [
    { field: 'sno', header: '#' },
    { field: 'workername', header: 'Worker Name' },
    { field: 'description', header: 'Description' },
    { field: 'antHrs', header: 'Ant. Hrs' },
    { field: 'actHrs', header: 'Act. Hrs' },
    { field: 'billRate', header: 'Bill Rate' },
    { field: 'amount', header: 'Amount' },
];

const dataTableData = [
    {
        id: 1,
        sno: 1,
        workername: 'John Doe',
        description: 'Task 1',
        antHrs: 10,
        actHrs: 10,
        billRate: 50,
        amount: 500,
    },
    {
        id: 2,
        sno: 2,
        workername: 'Jane Smith',
        description: 'Task 2',
        antHrs: 20,
        actHrs: 10,
        billRate: 50,
        amount: 500,
    },
];

function CreatedInvoiceView({ rowData ,handleScroll}) {
    const toast = useRef(null);
    const toastOptions = {
        // life: 3000,
        sticky: true,
        severity: 'success',
        summary: 'Invoice Sent',
        detail: 'Invoice has been sent successfully!',
    };
    const data = rowData?.data || {};

    const handlePrint = () => {
        const printContent = document.querySelector('.container');
        const buttonsContainer = document.querySelector('.print-download-sendinvoice');

        buttonsContainer.style.visibility = 'hidden';

        const printWindow = window.open('', '_blank');

        const styles = Array.from(document.styleSheets)
            .map((styleSheet) => {
                try {
                    return Array.from(styleSheet.cssRules)
                        .map((rule) => rule.cssText)
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
        elements.forEach((el) => {
            el.style.pageBreakInside = 'avoid';
        });

        printWindow.onload = () => {
            printWindow.print();
            buttonsContainer.style.visibility = 'visible';
        };
    };

    const handleDownloadPDF = () => {
        const element = document.querySelector('.container');
        const buttonsContainer = document.querySelector('.print-download-sendinvoice');

        buttonsContainer.style.visibility = 'hidden';

        const elements = element.querySelectorAll('*');
        elements.forEach((el) => {
            el.style.pageBreakInside = 'avoid';
        });

        const invoiceNumber = 'LRIN-004567';
        const fileName = `invoice_${invoiceNumber}.pdf`;

        html2pdf()
            .from(element)
            .toPdf()
            .get('pdf')
            .then((pdf) => {
                pdf.save(fileName);

                elements.forEach((el) => {
                    el.style.pageBreakInside = '';
                });

                buttonsContainer.style.visibility = 'visible';
            });
    };

    const handleSendInvoice = () => {
        if (toast.current) {
            toast.current.show(toastOptions);
        }
        console.log('Invoice Sent Successfully');
    };


    return (
        <>
            <div className="fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2 " onScroll={handleScroll}>
                {Object.keys(data).length > 0 && (
                    <div className="container">
                        <div className="row mb-2">
                            <div className="col-12 text-center">
                                <img src={raveslogo} className="cursor-pointer" alt="Company Logo" />
                            </div>
                        </div>

                        {/* Invoice Header */}
                        <div className="row mb-2">
                            <div className="col-8">
                                <span>INVOICE TO</span>
                                <h4>David Warner{data.name}</h4>

                                <span>Address:</span>
                                <h6>Lucid Technologies</h6>
                                <h6>#65, 4328 Marion Street</h6>
                                <h6>Newbury, VT 05051</h6>
                                <p>Phone : +91 999 999 9999</p>
                            </div>
                            <div className="col-4">
                                <h4>INVOICE</h4>
                                <h6>
                                    {' '}
                                    <span>INVOICE ID : </span> <span>LRIN-004560</span>
                                </h6>
                                <h6>
                                    {' '}
                                    <span className="pe-5">DATE</span>: 23-AUG-2023
                                </h6>
                                {/* {data.invoiceDate} */}
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="row">
                            <div className="col-12">
                                <DataTable value={dataTableData}>
                                    {dataTableColumns.map((column) => (
                                        <Column key={column.field} field={column.field} header={column.header} />
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
                            <div className="col-12 mb-6">
                                <p className="text-justify invoice-note-bg rounded-1 p-3">
                                    <b>NOTES: </b> All accounts are to be paid within 7 days from receipt of invoice. To
                                    be paid by cheque or credit card or direct payment online. If account is not paid
                                    within 7 days the credits details supplied as confirmation of work undertaken will
                                    be charged the agreed quoted fee noted above.
                                </p>
                            </div>
                        </div>

                        {/* Print, Download and Send Invoice */}
                        <div className="print-download-sendinvoice fixed bottom-0 h-custom-10 p-sidebar-header col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3 gap-3">
                            <Button
                                type="button"
                                severity="secondary"
                                icon="pi pi-print"
                                label="Print"
                                size="small"
                                className=""
                                onClick={handlePrint}
                            />
                            <Button
                                type="button"
                                severity="secondary"
                                icon="pi pi-arrow-down"
                                label="Download"
                                size="small"
                                className=""
                                onClick={handleDownloadPDF}
                            />
                            <Button
                                type="button"
                                severity="primary"
                                icon=""
                                label="Send Invoice"
                                size="small"
                                className="me-2"
                                onClick={handleSendInvoice}
                            />
                        </div>
                        <Toast ref={toast} />
                    </div>
                )}
            </div>
        </>
    );
}

export default CreatedInvoiceView;
