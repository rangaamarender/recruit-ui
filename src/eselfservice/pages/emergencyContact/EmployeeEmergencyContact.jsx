import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FiEdit2 } from 'react-icons/fi';
import PlainLayout from '../../../components/layouts/PlainLayout';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
import Viewer from '../../../components/viewers/Viewer';
import AddEmergencyContact from './AddEmergencyContact';
import { fetchResourceByIdRequest, updateResourceRequest } from '../../../redux/actions/resourceActions';
import { workerID } from '../WorkerId';

const EmployeeEmergencyContact = () => {

    const toast = useRef(null)

    const showError = (errorMessage) => {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: errorMessage,
        })
    }

    const showSuccess = () => {
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Successfully updated",
        })
    }
    const editActionErrorMessage = "Complete the current action first!"
    const dispatch = useDispatch()

    const { selectedResource } = useSelector((state) => state.resource);

    const emergencyContact = selectedResource?.personLegal?.personEmergencyContact

    console.log(emergencyContact, "emergencyContact")

    useEffect(() => {
        // const workerID = '826593c7-e272-4554-bebf-e10d16ee7b5a';
        dispatch(fetchResourceByIdRequest(workerID));
        dispatch(setCurrentPageName('Emergency Contact'));
    }, [dispatch]);


    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [emergencycontact, setEmergencyContact] = useState(emergencyContact || []);
    const [initialEmergencyContact, setInitialEmergencyContact] = useState([...emergencycontact]);
    const [editingRow, setEditingRow] = useState(null);
    const [editMode, setEditMode] = useState(false); // New state variable to track edit mode

    const actionTemplate = (rowData) => {
        if (editingRow === rowData.personEmergContactId) {
            return (
                <div className="d-flex  ">
                    <div className='me-2'>
                        <Button type="button"
                            icon="pi pi-check"
                            onClick={() => handleTick(rowData)}
                            className="" />
                    </div>
                    <Button
                        type="button"
                        severity="secondary"
                        icon="pi pi-times"
                        onClick={() => handleCancelEdit()}
                        className=""
                    />
                </div>
            );
        } else {
            return (
                <div className='cursor-pointer d-flex align-item-center gap-4'>
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleEdit(rowData)} />
                    <AiOutlineDelete className="m-1" size="1rem" onClick={() => handleDelete(rowData)} />
                </div>

            );
        }
    };

    const handleEdit = (rowData) => {
        if (editMode) {
            showError(editActionErrorMessage)
            // alert('Complete the current action first!');
        } else {
            setEditingRow(rowData.personEmergContactId);
            setEditMode(true); // Set edit mode to true
            setInitialEmergencyContact([...emergencycontact]);
        }
    };


    const handleTick = (rowData) => {
        const requiredFields = ['firstName', 'lastName', 'relation', 'emailId', 'phoneNumber'];
        const emptyFields = requiredFields.filter(field => {
            if (field === 'phoneNumber') {
                return !rowData[field]?.dialNumber;
            }
            return !rowData[field];
        });

        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.join(', ');
            showError(`Fields (${emptyFieldNames}) must be filled.`);
            return;
        }

        const updatedEmergencyContact = emergencycontact.map(contact => {
            if (contact.personEmergContactId === rowData.personEmergContactId) {
                return {
                    ...contact,
                    firstName: rowData.firstName,
                    lastName: rowData.lastName,
                    relation: rowData.relation,
                    emailType: 'test',
                    emailId: rowData.emailId,
                    phoneType: 'LandLine',
                    phoneNumber: {
                        dialNumber: rowData.phoneNumber?.dialNumber || '',
                    },
                };
            }
            return contact;
        });

        const payload = {
            workerID: selectedResource.workerID,
            personLegal: {
                personEmergencyContact: updatedEmergencyContact,
            },
        };

        dispatch(updateResourceRequest(selectedResource.workerID, payload));

        setEditingRow(null);
        setEditMode(false);
    };


    // const handleTick = (rowData) => {
    //     const updatedEmergencyContact = emergencycontact.map((contact) => {
    //         if (contact.personEmergContactId === rowData.personEmergContactId) {
    //             return {
    //                 ...contact,
    //                 firstName: rowData.firstName,
    //                 lastName: rowData.lastName,
    //                 relation: rowData.relation,
    //                 emailType: 'test',
    //                 emailId: rowData.emailId,
    //                 phoneType: 'LandLine',
    //                 phoneNumber: {
    //                     dialNumber: rowData.phoneNumber?.dialNumber || '',
    //                 },
    //             };
    //         }
    //         return contact;
    //     });

    //     const updatedContact = updatedEmergencyContact.find(
    //         (contact) => contact.personEmergContactId === rowData.personEmergContactId
    //     );

    //     const payload = {
    //         workerID: selectedResource.workerID,
    //         personLegal: {
    //             personEmergencyContact: [updatedContact], // Send only the updated contact
    //         },
    //     };

    //     dispatch(updateResourceRequest(selectedResource.workerID, payload));

    //     setEditingRow(null);
    //     setEditMode(false);
    //     // showSuccess()
    // };

    const handleCancelEdit = () => {
        setEmergencyContact([...initialEmergencyContact]); // Restore the initial state when canceling edit
        setEditingRow(null);
        setEditMode(false);
    };


    const handleDelete = async (rowData) => {
        if (editMode) {
            showError(editActionErrorMessage);
        } else {
            try {
                const updatedEmergencyContacts = emergencycontact.filter((item) => item.personEmergContactId !== rowData.personEmergContactId);
                console.log(updatedEmergencyContacts, "deletedependents")
                const payload = {
                    workerID: selectedResource.workerID,
                    personLegal: {
                        personEmergencyContact: updatedEmergencyContacts,
                    },
                };

                // Dispatch the update request
                await dispatch(updateResourceRequest(selectedResource.workerID, payload));

                // Update the local state with the updated list (excluding the deleted dependent)
                setEmergencyContact(updatedEmergencyContacts);
                // showSuccess(); // Show success message if needed
            } catch (error) {
                showError(`Failed to delete the row. ${error.message}`); // Show error message with more details
                console.error('Delete request failed:', error);
            }
        }
    };



    const handleInputChange = (propertyKey, e, rowData) => {
        const updatedEmergencyContact = emergencycontact.map((item) => {
            if (item.personEmergContactId === rowData.personEmergContactId) {
                if (propertyKey === 'phoneNumber') {
                    return {
                        ...item,
                        phoneNumber: {
                            ...item.phoneNumber,
                            dialNumber: e.target.value, // Update dialNumber with the new value
                        },
                    };
                }
                return { ...item, [propertyKey]: e.target.value }; // Update other properties normally
            }
            return item;
        });

        setEmergencyContact(updatedEmergencyContact);
    };


    const generateInputField = (rowData, propertyKey) => {
        return editingRow === rowData.personEmergContactId ? (
            <InputText
                value={rowData[propertyKey]}
                onChange={(e) => handleInputChange(propertyKey, e, rowData)}

            />
        ) : (
            rowData[propertyKey]
        );
    };

    const inputTextTemplate = (rowData) => {
        return generateInputField(rowData, 'relation');
    };

    const inputTextfirstName = (rowData) => {
        return generateInputField(rowData, 'firstName');
    };
    const inputTextlastName = (rowData) => {
        return generateInputField(rowData, 'lastName');
    };

    const inputTextEmail = (rowData) => {
        return generateInputField(rowData, 'emailId');
    };

    const inputPhoneNumber = (rowData) => {
        const dialNumber = rowData.phoneNumber?.dialNumber || rowData.dialNumber; // Check both possible structures

        return editingRow === rowData.personEmergContactId ? (
            <InputText
                value={dialNumber}
                onChange={(e) => handleInputChange('phoneNumber', e, rowData)}
            />
        ) : (
            dialNumber
        );
    };


    const addEmergencyContactActionHandler = () => {
        if (editMode) {
            showError();
        } else {
            setSidebarVisible(true);

        }
    };

    const handleOnHide = () => {
        setSidebarVisible(false);
    };

    const handleAddEmergencyContact = (newContact) => {
        const updatedEmergencyContacts = [...emergencycontact, newContact];
        setEmergencyContact(updatedEmergencyContacts);
        setSidebarVisible(false);
        showSuccess()
    };

    return (
        <PlainLayout>

            <Viewer
                visible={sidebarVisible}
                onHide={handleOnHide}
                header={
                    <TitleHeaderOnly
                        onClick={handleOnHide}
                        title={"Add Emergency Contact"}
                    />
                }
                contentComponent={<AddEmergencyContact
                    onAddContact={handleAddEmergencyContact}
                    setSidebarVisable={setSidebarVisible}
                    showError={showError}
                />}
            />


            <Toast ref={toast} />
            <div className="company-main-text fs-6 pb-2 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Emergency Contact</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <Button icon='pi  pi-plus fw-normal fs-5' size='small' severity='primary'
                        onClick={addEmergencyContactActionHandler}
                    />
                </div>
            </div>

            <div className='mt-3'>
                <DataTable value={emergencycontact} size="small" dataKey="id" className="card">
                    <Column field="firstName" header="first Name" body={inputTextfirstName} />
                    <Column field="lastName" header="last Name" body={inputTextlastName} />
                    <Column field="relation" header="Relation" body={inputTextTemplate} />
                    <Column field="phoneNumber" header="Phone Number" body={inputPhoneNumber} />
                    <Column field="emailId" header="Email" body={inputTextEmail} />
                    <Column body={actionTemplate} style={{ textAlign: 'center', width: '6em' }} />
                </DataTable>
            </div>


        </PlainLayout>
    );
};

export default EmployeeEmergencyContact;

