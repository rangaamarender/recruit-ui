import React, { useState } from 'react';
import { Button } from 'primereact/button';

const FileUploader = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (validateFileType(file)) {
                setSelectedFile(file);
                onFileSelect(file);
                setErrorMessage('');
            } else {
                setErrorMessage('Invalid file format. Allowed formats: txt, doc, docx, pdf.');
            }
        }
    };

    const validateFileType = (file) => {
        const allowedTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return allowedTypes.includes(file.type);
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            if (validateFileType(file)) {
                setSelectedFile(file);
                onFileSelect(file);
                setErrorMessage('');
            } else {
                setErrorMessage('Invalid file format. Allowed formats: txt, doc, docx, pdf.');
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h3>Upload Resume</h3>
            <div
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                style={{ border: '2px dashed #aaa', padding: '20px', textAlign: 'center' }}
            >
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} accept=".txt,.doc,.docx,.pdf" />
                <Button
                    label="Upload"
                    severity="secondary"
                    icon="pi pi-upload"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                />
                <br />
                <span className="p-text-secondary">OR</span>
                <p className="p-text-secondary">Drag and drop a file here</p>



                {selectedFile && <p>Selected File: {selectedFile.name}</p>}
            </div>
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        </div>
    );
};

export default FileUploader;
