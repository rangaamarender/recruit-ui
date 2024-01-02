import React, { useEffect, useState } from 'react';
import PlainLayout from '../../../components/layouts/PlainLayout';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import FileUploader from './FileUploader';
import PreviewResume from './PreviewResume';

function EmployeeResumePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageName('Resume'));
    }, [dispatch]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [showUploader, setShowUploader] = useState(true);

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setShowUploader(false); // Hide FileUploader after file selection
    };

    const handleReturnToUploader = () => {
        setSelectedFile(null);
        setShowUploader(true); // Show FileUploader again
    };

    return (
        <PlainLayout>
            <>
               
                {showUploader && <FileUploader onFileSelect={handleFileSelect} />}
                {selectedFile && !showUploader && (
                    <PreviewResume selectedFile={selectedFile} returnToUploader={handleReturnToUploader} />
                )}
            </>
        </PlainLayout>
    );
}

export default EmployeeResumePage