import React from 'react';
import CustomMultiSelect from '../../../../components/controls/CustomMultiSelect';
import { useState } from 'react';

const options = [
    { value: 'Document1', label: 'Document1' },
    { value: 'Document2', label: 'Document2' },
    { value: 'Document3', label: 'Document3' },
    { value: 'Document4', label: 'Document4' },
];

const ResourceAssignDocument = ({ control, errors, required, setValue, formData, setRule }) => {
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    const handleMultiSelectDocuments = (e) => {
        setValue('selectDocuments', e.value);
        setSelectedDocuments(e.value);
    };

    console.log(formData, 'selectDocuments');

    const panelFooterTemplate = () => {
        const length = selectedDocuments.length;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length !== 1 ? 's' : ''} selected.
            </div>
        );
    };

    return (
        <>
            <div className="formgrid grid mb-6">
                <div className="col-12">
                    <CustomMultiSelect
                        control={control}
                        errors={errors}
                        name="selectDocuments"
                        labelId="selectDocuments.label"
                        defaultValue=""
                        options={options}
                        onChange={handleMultiSelectDocuments}
                        required={true}
                        helpMsg=""
                        panelFooterTemplate={panelFooterTemplate}
                        placeholder="Select documents"
                        requiredMsg="selectDocuments.required"
                        autoFocus
                    />
                </div>
            </div>
        </>
    );
};

export default ResourceAssignDocument;