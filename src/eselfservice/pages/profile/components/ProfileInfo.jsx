import React, { useEffect, useRef, useState } from 'react'
import { RiPencilFill } from 'react-icons/ri'
// import personalInformation from "./../../../../assets/__mockData__/personalInformation.json"
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import CustomInputText from "../../../../components/controls/CustomInputText"
import CustomCalender from "../../../../components/controls/CustomCalender"
// import CustomInputMask from "../../../../components/controls/CustomInputMask"
import { Toast } from 'primereact/toast';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResourceByIdRequest, updateResourceRequest } from '../../../../redux/actions/resourceActions';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { workerID } from '../../WorkerId';

function ProfileInfo({ active, setActive }) {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const { selectedResource } = useSelector((state) => state.resource);
    const workerTypes = useSelector((state) => state.adminRole.workerTypes);

    useEffect(() => {
        // const workerID = '9b343e7f-e145-4b0b-b6c7-7afca7a78c87';
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);

    console.log(selectedResource)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const DisplayformatDate = (dateString) => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    const onSubmit = (data) => {
        const { joiningDate, personLegal, workerStatus, employmentType } = data;
        // const workerID = '9b343e7f-e145-4b0b-b6c7-7afca7a78c87';
        const filteredData = {

            joiningDate: formatDate(joiningDate),
            personLegal: {
                givenName: personLegal.givenName,
                familyName: personLegal.familyName,
                preferredName: personLegal.preferredName,
                birthDate: formatDate(personLegal.birthDate),
                gender: personLegal.gender,
                maritalStatus: personLegal.maritalStatus,
            },
            // workerType: {
            //     workerTypeCode: workerType.workerTypeCode,
            //     name: workerType.name,
            // },
            workerStatus,
            employmentType,
        };

        dispatch(updateResourceRequest(workerID, filteredData));

        // const updatedResource = { ...selectedResource, ...updatedData };
        // dispatch(updateResourceRequest(selectedResource.workerID, updatedResource));
        setIsEdit(false);
        setActive("all");
    };

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);

    // const onSubmit = (data) => {
    //     setIsEdit(false);
    //     setActive("all")

    //     toast.current.show({
    //         severity: 'success',
    //         summary: 'Success Message',
    //         detail: 'Profile information updated successfully!',
    //     });
    // };

    const handleEdit = () => {
        setIsEdit(true);
        setActive('all')
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive("all")
    };

    return (
        <>
            <div className=''>
                <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                    <div className='name-view-heading'>Profile Info</div>
                    {!isEdit && (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                        </div>
                    )}

                </div>
                <Toast ref={toast} />

                {isEdit && (
                    <Viewer
                        visible={isEdit}
                        onHide={handleCancelEdit}
                        header={
                            <TitleHeaderOnly
                                onClick={handleCancelEdit}
                                title={"Edit Profile Info"}
                            />
                        }
                        contentComponent={
                            <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                                <div className="formgrid grid p-3">
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="personLegal.givenName"
                                            labelId="firstName.label"
                                            placeholder="first name"
                                            defaultValue={selectedResource?.personLegal?.givenName || ""}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="personLegal.middleName"
                                            labelId="middleName.label"
                                            placeholder="middle name"
                                            defaultValue={selectedResource?.personLegal?.middleName || ""}
                                           
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="personLegal.familyName"
                                            labelId="lastName.label"
                                            placeholder="last name"
                                            defaultValue={selectedResource?.personLegal?.familyName || ""}
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="personLegal.preferredName"
                                            labelId="displayName.label"
                                            placeholder="Display name"
                                            defaultValue={selectedResource?.personLegal?.preferredName || ""}
                                        />
                                    </div>
                                    {/* <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name=""
                                            labelId="primaryEmailId.label"
                                            placeholder="admin@example.com"
                                            // defaultValue={selectedResource?.personLegal?.primaryContactDetails[0]?.emailId}
                                            defaultValue={selectedResource?.personLegal?.primaryContactDetails?.map((item) => item.emailId) || ""}
                                            disabled
                                        />
                                    </div> */}

                                    {/* here date formate must be in 2023-08-15 */}
                                    <div className="col-12 md:col-6">
                                        <CustomCalender
                                            control={control}
                                            errors={errors}
                                            name="personLegal.birthDate"
                                            labelId="DOB"
                                            showIcon={true}
                                            placeholder="MM-DD-YYYY"
                                            defaultValue={selectedResource?.personLegal?.birthDate || ""}
                                        />
                                    </div>
            
                                    <div className="col-12 md:col-6">
                                        <CustomCalender
                                            control={control}
                                            errors={errors}
                                            name="joiningDate"
                                            labelId="startDate.label"
                                            showIcon={true}
                                            placeholder="MM-DD-YYYY"
                                            defaultValue={selectedResource?.joiningDate ? formatDate(selectedResource?.joiningDate) : null}
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="personLegal.gender"
                                            labelId="gender.label"
                                            placeholder="Gender"
                                            defaultValue={selectedResource?.personLegal?.gender || null}
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="personLegal.maritalStatus"
                                            labelId="maritalStatus.label"
                                            placeholder="Marital Status"
                                            defaultValue={selectedResource?.personLegal?.maritalStatus || null}
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomDropdown
                                            control={control}
                                            errors={errors}
                                            name=""
                                            labelId="resourceType.label"
                                            defaultValue={selectedResource?.workerType?.workerTypeCode}
                                            options={workerTypes?.map(workerType => ({
                                                value: workerType.workerTypeCode,
                                                label: workerType.workerTypeName
                                            })) || ""}
                                            placeholder="Select Resource type"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomDropdown
                                            control={control}
                                            errors={errors}
                                            name=""
                                            labelId="status.label"
                                            defaultValue={selectedResource?.workerStatus?.map((item) =>
                                                item.status).join(', ') || ''}
                                            options={selectedResource?.workerStatus?.map((item) => ({
                                                value: item.status,
                                                label: item.status,
                                            }))}
                                            placeholder="Select Status"
                                            disabled
                                        />
                                    </div>
                                   

                                    <div className="p-sidebar-header col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                                        <Button type="button" severity="secondary" label="Cancel" size="small" className="" onClick={handleCancelEdit} />
                                        <Button type="submit" severity="primary" label="Update" size="small" className="ms-2 me-2" />
                                    </div>
                                </div>
                            </form>
                        }
                    />
                )}

                { (
                    <>
                        <div className="formgrid grid m-2">
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>First Name</label>
                                <p className="p-text-p-text-primary">{selectedResource?.personLegal?.givenName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Middle Name</label>
                                <p className="p-text-p-text-primary">{selectedResource?.personLegal?.middleName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Last Name</label>
                                <p className="p-text-p-text-primary">{selectedResource?.personLegal?.familyName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Display Name</label>
                                <p className="p-text-p-text-primary">{selectedResource?.personLegal?.preferredName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Primary Email ID</label>
                                <p className="p-text-p-text-primary">{selectedResource?.personLegal?.primaryContactDetails.map((item) => item.emailId) || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Primary Phone NO</label>
                                <p className="p-text-p-text-primary">
                                    {selectedResource?.personLegal?.primaryContactDetails?.[0]?.phoneNumber?.[0]?.dialNumber || ""}
                                </p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>DOB</label>
                                <p className="p-text-p-text-primary">{DisplayformatDate(selectedResource?.personLegal?.birthDate) || ""}</p>
                            </div>
                           
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Start Date</label>
                                <p className="p-text-p-text-primary">{DisplayformatDate(selectedResource?.joiningDate) || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Gender</label>
                                <p className="p-text-p-text-primary">{selectedResource?.personLegal?.gender || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Marital Status</label>
                                <p className="p-text-p-text-primary">{selectedResource?.personLegal?.maritalStatus || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Employee Type</label>
                                <p className="p-text-p-text-primary">{selectedResource?.workerType?.name || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Current Status</label>
                                <p className="p-text-p-text-primary">{selectedResource?.workerStatus?.map((item) => item.status || "")}</p>
                            </div>
                           
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ProfileInfo