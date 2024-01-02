import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomInputFile from '../../../components/controls/CustomInputFile';
import { useForm } from 'react-hook-form';
const PayrollDocument = () => {
    const {
        control,
        formState: { errors },
    } = useForm();
    const required = false;
    return (
        <div className="p-3">
            <div className="profilepic-border rounded rounded mt-1 p-5 d-flex justify-content-center align-items-center">
                <div className="">
                    <CustomInputFile
                        control={control}
                        errors={errors}
                        name="document"
                        requiredMsg="Document is required"
                        defaultValue=""
                        required={required}
                    />
                    <span>JPG, PNG, DOC or PDF smaller than 30 MB</span>
                </div>
            </div>
            <div className="company-main-text fs-6 p-3 fw-bold d-flex justify-content-between align-items-center  ">
                <div>Documents</div>
            </div>
            <div>
                <DataTable value={''} tableStyle={{ minWidth: '50rem' }} size="small">
                    <Column field="title" header="Title"></Column>
                    <Column field="resourceId" header="Resource ID"></Column>
                    <Column field="DocNumber" header="Doc. Number "></Column>
                    <Column field="uploadDate" header="Upload Date"></Column>
                    <Column field="expiryDate" header="Expiry Date"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default PayrollDocument;
