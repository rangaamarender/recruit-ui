import React from 'react';
import CustomInputFile from '../../../components/controls/CustomInputFile';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';


const AdminUploadHoliday = () => {
    const {
        control,
        formState: { errors },
    } = useForm();
    const required = false;
    const generateSampleExcel = () => {
        const data = [
            ['Date', 'Holiday Name', 'Type'],
        ];

        const csvContent = data.map((row) => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample_holidays.csv'; 
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="card p-4">
            <div className="m-auto mt-3">
                <CustomInputFile
                    control={control}
                    errors={errors}
                    name="fileUpload"
                    requiredMsg="Document is required"
                    defaultValue=""
                    required={required}
                />
            </div>
            <div className="m-auto d-flex gap-2">
                <div className="mt-2">
                    <p>Importing Requires Microsoft excel.xlsv and .csv format</p>
                </div>
                <div>
                    <Button label="Download sample format" text size='small' icon="pi pi-download" onClick={generateSampleExcel} />
                </div>
            </div>
        </div>
    );
};

export default AdminUploadHoliday;
