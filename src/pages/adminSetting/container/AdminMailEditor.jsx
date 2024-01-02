import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import CustomInputText from '../../../components/controls/CustomInputText';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';

const AdminMailEditor = ({ setVisible, handleMailUpdate, handleMailUpdate1, editMode, mailRowData, mailData }) => {
    const [editMailValue, setEditMailValue] = useState();
    const toast = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        if (editMode && mailRowData) {
            setValue('name', mailRowData.name);
            setValue('subject', mailRowData.subject);
            setValue('description', mailRowData.editMailValue);
        } else {
            reset();
        }
    }, [editMode, mailRowData, reset, setValue]);

    const handleAddClick = (data) => {
        const newMailTemplate = {
            id: new Date().getTime(),
            name: data.name,
            subject: data.subject,
            description: editMailValue,
            createdBy: 'Abhishek phulhari',
            createdOn: 'Mar 01, 2022',
        };
        handleMailUpdate(newMailTemplate);
        reset();
        setEditMailValue('');
        setVisible(false);
    };

    const handleUpdateClick = (data) => {
        const updatedMailTemplate = {
            ...mailRowData,
            name: data.name,
            subject: data.subject,
            description: editMailValue,
        };
        const isDuplicateSubject = mailData.some(
            (mail) => mail.subject.toLowerCase().trim() === updatedMailTemplate.subject.toLowerCase().trim()
        );
        if (isDuplicateSubject) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Duplicate Subject name' });
        } else {
            handleMailUpdate1(updatedMailTemplate);
            setVisible(false);
        }
    };

    return (
        <div>
            <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                <TitleHeaderOnly
                    title={editMode ? 'Edit Mail Template' : 'Create New Email Template'}
                    onClick={() => setVisible(false)}
                />
            </div>
            <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                <div className="p-fluid">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="name"
                        labelId="Template Name"
                        required={true}
                        requiredMsg="Template Name Require"
                    />
                </div>
                <div className="p-fluid">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="subject"
                        labelId="Subject"
                        required={true}
                        requiredMsg="Subject"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="Description">Description</label>
                    <Editor
                        value={editMailValue}
                        onTextChange={(e) => setEditMailValue(e.htmlValue)}
                        style={{ height: '150px' }}
                    />
                </div>
            </div>
            <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                    <Button label="Cancel" size="small" severity="secondary" onClick={() => setVisible(false)} />
                    {editMode ? (
                        <Button label="Update" size="small" onClick={handleSubmit(handleUpdateClick)} />
                    ) : (
                        <Button label="Add" size="small" onClick={handleSubmit(handleAddClick)} />
                    )}
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

export default AdminMailEditor;
