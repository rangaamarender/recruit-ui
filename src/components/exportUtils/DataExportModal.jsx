import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import CustomModalHeader from '../CustomModalHeader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DataExportModal({ columnConfig, showExportModal, setShowExportModal, exportData, dataTableRef }) {
    const [exportFormat, setExportFormat] = useState('csv');

    const exportColumns = columnConfig
        .filter((col) => col.isSelected)
        .map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));

    const handleModalClose = () => {
        setShowExportModal(false);
        setExportFormat('csv');
    };

    const exportTableData = () => {
        if (exportFormat === 'csv') {
            if (dataTableRef.current) {
                dataTableRef.current.exportCSV();
            }
            setShowExportModal(false);
        } else {
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm', // or 'pt' or 'px'
                format: 'a4', // or your preferred page size
            });

            const tableOptions = {
                columns: exportColumns,
                body: exportData,
                margin: { top: 10, right: 10, bottom: 10, left: 10 },
                styles: { fontSize: 9 }, // Adjust the font size as needed
            };

            doc.autoTable(tableOptions);
            doc.save('Tabledata.pdf');
            setShowExportModal(false);
        }
    };


    const footerContent = (
        <div className="d-flex gap-2 justify-content-end">
            <Button severity="secondary" size="small" label="Cancel" onClick={() => handleModalClose()} />
            <Button size="small" label="Export" onClick={exportTableData} />
        </div>
    );

    return (
        <>
            <Dialog
                header={CustomModalHeader({ title: 'Export', onClick: handleModalClose })}
                visible={showExportModal}
                onHide={() => handleModalClose()}
                className="w-50"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                closeIcon
                footer={footerContent}
                dismissableMask="true"
            >
                <div className="d-flex justify-content-center flex-column ">
                    <p className="fw-normal mb-4">Select the file type you would like to Export</p>

                    <label htmlFor="myDropdown">File Type</label>
                    <div className="card d-flex justify-content-center mt-2">
                        <Dropdown
                            id="myDropdown"
                            value={exportFormat}
                            onChange={(e) => setExportFormat(e.value)}
                            options={[
                                { fileType: 'CSV', value: 'csv' },
                                { fileType: 'PDF', value: 'pdf' },
                            ]}
                            optionLabel="fileType"
                            placeholder="Select a File Type"
                            className="w-100"
                            defaultValue={exportFormat === 'CSV'}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default DataExportModal;
