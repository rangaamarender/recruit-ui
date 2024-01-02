import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import React, { useState } from 'react';
import CustomInputFile from '../../../../components/controls/CustomInputFile';
import { validateFileSize, validateFileType } from '../../config/timesheetDocumentsType';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storeTimesheetDoc } from '../../../../redux/actions/timesheetActions';

function SelectDocument({ control, errors }) {
    const dispatch = useDispatch();
    const docData = useSelector((state) => state.timesheet.timesheetDocData)
    const [add, setAdd] = useState(docData)
    const [selectedFile, setSelectedFile] = useState(null);
    const [displayFileDialog, setDisplayFileDialog] = useState(false);
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const [fileValidationError, setFileValidationError] = useState("");
console.log(selectedFile)

    useEffect(() => {
        dispatch(storeTimesheetDoc(add))
    })
    const handleFileView = (file) => {
        setSelectedFileContent(file);
        setDisplayFileDialog(true);
    };

    const hideFileDialog = () => {
        setDisplayFileDialog(false);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        // Check file type
        if (!validateFileType(file)) {
            setFileValidationError("File types are allowed: jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx");
            setSelectedFile(null);
            return;
        }

        // Check file size
        if (!validateFileSize(file)) {
            setFileValidationError("Maximum file size allowed is 30MB");
            setSelectedFile(null);
            return;
        }

        setFileValidationError("");
        setSelectedFile(file);

        // Automatically add the selected file to the table
        if (file) {
            setAdd([...add, file]);
        }
    };

    const removeFileFromTable = (index) => {
        const updatedTableData = [...add];
        updatedTableData.splice(index, 1);
        setAdd(updatedTableData);
    };

    const renderFileTable = () => {
        return (
            <div>
                <h5>Selected Files:</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="l-width-70">File Name</th>
                            <th className="l-width-30">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {add.map((file, index) => (
                            <tr key={index}>
                                <td className="text-start">{file.name}</td>
                                <td className="text-start">
                                    <span
                                        className="cursorPointer pe-3"
                                        onClick={() => handleFileView(file)}
                                    >
                                        <i className="pi pi-eye"></i>
                                    </span>
                                    <span
                                        className="cursorPointer"
                                        onClick={() => removeFileFromTable(index)}
                                    >
                                        <i className="pi pi-trash"></i>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            <div className='flex-auto mb-3 d-flex'>
                <div className='col-md-10'>
                    <CustomInputFile
                        control={control}
                        errors={errors}
                        name="fileUpload"
                        onChange={handleFileInputChange}
                    />
                    <span>File Types: jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx</span>
                    {fileValidationError && (
                        <div className="text-danger">{fileValidationError}</div>
                    )}
                </div>
            </div>

            <div>
                {add.length > 0 && renderFileTable()}
            </div>

            {/* Dialog to view file */}
            <Dialog
                visible={displayFileDialog}
                onHide={hideFileDialog}
                header="File Viewer"
                maximizable
                style={{ width: "50vw" }}
                footer={
                    <div className="p-d-flex p-ai-center p-jc-between">
                        <Button
                            label="Close"
                            icon="pi pi-times"
                            onClick={hideFileDialog}
                            className="p-button-text"
                        />
                    </div>
                }
            >
                <div className="p-fluid">
                    {selectedFileContent && (
                        <iframe
                            src={URL.createObjectURL(selectedFileContent)}
                            style={{ width: "100%", height: "500px" }}
                            title="File Viewer"
                        ></iframe>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default SelectDocument;
