import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import PlainLayout from '../../../components/layouts/PlainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import Viewer from '../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
import AddDependent from './AddDependent';
import { fetchResourceByIdRequest, updateResourceRequest } from '../../../redux/actions/resourceActions';
import { workerID } from '../WorkerId';

const EmployeeDependentsPage = () => {
    const toast = useRef(null)
    const dispatch = useDispatch()
    const { selectedResource } = useSelector((state) => state.resource);

    const personDependents = selectedResource?.personLegal?.personDependents

    
    useEffect(() => {
        // const workerID = '353ef016-08d2-4889-a0dd-f6d74d38320a';
        dispatch(fetchResourceByIdRequest(workerID));
        dispatch(setCurrentPageName('Dependents'));
    }, [dispatch]);

    console.log(personDependents,'selectedResource')


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [dependents, setDependents] = useState(personDependents || []);
    const [initialDependents, setInitialDependents] = useState([...dependents]);
    const [editingRow, setEditingRow] = useState(null);
    const [editMode, setEditMode] = useState(false);

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


    const actionTemplate = (rowData) => {
        if (editingRow === rowData.personDepId) {
            return (
                <div className="d-flex gap-2">

                    <Button type="button"
                        size='small'
                        icon="pi pi-check"
                        onClick={() => handleTick(rowData)}
                        className="" />

                    <Button
                        type="button"
                        size='small'
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
            showError('Complete the current action first!');
        } else {
            setEditingRow(rowData.personDepId); // Change 'id' to 'personDepId' to identify rows
            setEditMode(true);
            setInitialDependents([...dependents]);
        }
    };

   


    // const handleTick = (rowData) => {
    //     const requiredFields = ['firstName', 'lastName', 'relation', 'brithDate'];
    //     const emptyFields = requiredFields.filter((field) => !rowData[field]);
        
    //     if (emptyFields.length > 0) {
    //         const emptyFieldNames = emptyFields.join(', ');
    //         showError(`Fields (${emptyFieldNames}) must be filled.`);
    //         return;
    //     }
        
    //     const updatedDependents = dependents.map((dependent) => {
    //         if (dependent.personDepId === rowData.personDepId) {
    //             return {
    //                 ...dependent,
    //                 firstName: rowData.firstName,
    //                 lastName: rowData.lastName,
    //                 relation: rowData.relation,
    //                 brithDate: formatDate(rowData.brithDate),
    //             };
    //         }
    //         return dependent;
    //     });
        
    //     const payload = {
    //         workerID: selectedResource.workerID,
    //         personLegal: {
    //             personDependents: updatedDependents,
    //         },
    //     };
        
    //     // Dispatch the update request with the payload
    //     dispatch(updateResourceRequest(selectedResource.workerID, payload));
        
    //     setEditingRow(null);
    //     setEditMode(false);
    //     // showSuccess();
    // };
    
    
    const handleTick = (rowData) => {
        const requiredFields = ['firstName', 'lastName', 'relation', 'brithDate'];
        const emptyFields = requiredFields.filter((field) => !rowData[field]);
    
        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.join(', ');
            showError(`Fields (${emptyFieldNames}) must be filled.`);
            return;
        }
    
        const updatedDependents = dependents.map((dependent) => {
            if (dependent.personDepId === rowData.personDepId) {
                return {
                    ...dependent,
                    firstName: rowData.firstName,
                    lastName: rowData.lastName,
                    relation: rowData.relation,
                    brithDate: formatDate(rowData.brithDate),
                };
            }
            return dependent;
        });
    
        const payload = {
            workerID: selectedResource.workerID,
            personLegal: {
                personDependents: updatedDependents,
            },
        };
    
        // Dispatch the update request with the payload
        dispatch(updateResourceRequest(selectedResource.workerID, payload));
    
        setEditingRow(null);
        setEditMode(false);
        showSuccess();
    };
    
  

    const handleCancelEdit = () => {
        setDependents([...initialDependents]); // Restore the initial state when canceling edit
        setEditingRow(null);
        setEditMode(false);
    };

    const handleDelete = async (rowData) => {
        if (editMode) {
            showError(editActionErrorMessage);
        } else {
            try {
                const updatedDependents = dependents.filter((item) => item.personDepId !== rowData.personDepId);
    console.log(updatedDependents,"deletedependents")
                const payload = {
                    workerID: selectedResource.workerID,
                    personLegal: {
                        personDependents: updatedDependents,
                    },
                };
    
                // Dispatch the update request
                await dispatch(updateResourceRequest(selectedResource.workerID, payload));
    
                // Update the local state with the updated list (excluding the deleted dependent)
                setDependents(updatedDependents);
                showSuccess(); // Show success message if needed
            } catch (error) {
                showError(`Failed to delete the row. ${error.message}`); // Show error message with more details
                console.error('Delete request failed:', error);
            }
        }
    };
    
    
    
    

    const handleInputChange = (propertyKey, e, rowData) => {
        const updatedDependents = dependents.map((item) => {
            if (item.personDepId === rowData.personDepId) {
                return { ...item, [propertyKey]: e.target.value }; // Update the specific property
            }
            return item;
        });
    
        setDependents(updatedDependents);
    };

    const generateInputField = (rowData, propertyKey) => {
        return editingRow === rowData.personDepId ? (
            <InputText
                value={rowData[propertyKey]}
                onChange={(e) => handleInputChange(propertyKey, e, rowData)}
            />
        ) : (
            rowData[propertyKey]
        );
    };

    const inputDOB = (rowData) => {
        const brithDate = rowData.brithDate instanceof Date ? rowData.brithDate.toLocaleDateString() : rowData.brithDate;
        return editingRow === rowData.personDepId ? (
            <Calendar
                value={rowData.dateOfBirth instanceof Date ? rowData.brithDate : new Date(rowData.brithDate)}
                onChange={(e) => handleInputChange("brithDate", e, rowData)}
                dateFormat="mm/dd/yy"
                showIcon
            />
        ) : (
            brithDate // Render the formatted date as a string
        );
    };

    const inputTextFirstName = (rowData) => {
        return generateInputField(rowData, "firstName");
    };

    const inputTextLastName = (rowData) => {
        return generateInputField(rowData, "lastName");
    };

    const inputTextTemplate = (rowData) => {
        return generateInputField(rowData, "relation");
    };

   


    const addEmergencyContactActionHandler = () => {
        if (editMode) {
            showError(editActionErrorMessage);
        } else {
            setSidebarVisible(true);

        }
    };

    const handleOnHide = () => {
        setSidebarVisible(false);
    };

    const handleAddDependent = (newdependent) => {
        const updatedDependents = [...dependents, newdependent];
        setDependents(updatedDependents);
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
                            title={"Add Dependents"}
                        />
                    }
                    contentComponent={<AddDependent
                        onAddDependent={handleAddDependent}
                        setSidebarVisable={setSidebarVisible}/>}
                />



            <Toast ref={toast} />

            <div className="company-main-text fs-6 pb-2 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Dependents List</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <Button icon='pi  pi-plus fw-normal fs-5' size='small' severity='primary'
                        onClick={addEmergencyContactActionHandler}
                    />
                </div>
            </div>

            <div className='mt-3'>
                <DataTable value={dependents} size="small" dataKey="id" className="card">
                    <Column field="firstName" header="First Name" body={inputTextFirstName} />
                    <Column field="lastName" header="Last Name" body={inputTextLastName} />
                    <Column field="relation" header="Relation" body={inputTextTemplate} />
                    <Column field="brithDate" header="Date of Birth" body={inputDOB} />
                    <Column body={actionTemplate} style={{ textAlign: 'center', width: '6em' }} />
                </DataTable>
            </div>


        </PlainLayout>
    );
};

export default EmployeeDependentsPage;

