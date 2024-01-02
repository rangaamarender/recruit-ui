import React, { useState } from 'react';
// import { Controller } from 'react-hook-form';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';

const allowedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'application/pdf',
    'image/svg+xml',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB in bytes

const CustomFileUpload = ({
    control,
    errors,
    name,
    label,
    onUpload,
    ...rest
}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadError, setUploadError] = useState(null);

    const handleFileSelect = (event) => {
        const files = event.files;
        let validFiles = [];

        // Check file size before adding to the selectedFiles array
        for (const file of files) {
            if (file.size <= MAX_FILE_SIZE) {
                validFiles.push(file);
            } else {
                setUploadError(`File "${file.name}" exceeds the maximum allowed size (32MB).`);
            }
        }

        setSelectedFiles(validFiles);
    };

    const handleDelete = (file) => {
        const updatedFiles = selectedFiles.filter((f) => f !== file);
        setSelectedFiles(updatedFiles);
    };

    const handleUpload = () => {
        setUploadedFiles([...uploadedFiles, ...selectedFiles]);
        setSelectedFiles([]);
        setUploadError(null);
        onUpload();
    };

    const fileColumns = [
        { field: 'name', header: 'File Name' },
        {
            field: 'actions',
            header: 'Actions',
            body: (file) => (
                <div>
                    <Button type='button' label="View" onClick={() => handleView(file)} />
                    <Button label="Delete" onClick={() => handleDelete(file)} />
                </div>
            ),
        },
    ];

    const handleView = (file) => {
        // Add your code to handle viewing the file here
        console.log('View file:', file);
    };

    return (
        <div>
            <div>
                <label>{label}</label>
                <FileUpload
                    name={name}
                    mode="basic"
                    accept={allowedFileTypes.join(',')}
                    onSelect={handleFileSelect}
                    {...rest}
                />
                <Button label="Upload" onClick={handleUpload} />
            </div>
            {uploadError && <div className="text-danger">{uploadError}</div>}
            {selectedFiles.length > 0 && (
                <div>
                    <p>Selected Files:</p>
                    <DataTable value={selectedFiles}>
                        {fileColumns.map((col) => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={col.body}
                            />
                        ))}
                    </DataTable>
                </div>
            )}
            {uploadedFiles.length > 0 && (
                <div>
                    <p>Uploaded Files:</p>
                    <DataTable value={uploadedFiles}>
                        {fileColumns.map((col) => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={col.body}
                            />
                        ))}
                    </DataTable>
                </div>
            )}
        </div>
    );
};

export default CustomFileUpload;
