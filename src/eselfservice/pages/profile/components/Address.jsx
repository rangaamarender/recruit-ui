import React, { useEffect, useState } from 'react'
import { RiPencilFill } from 'react-icons/ri'
import { Button } from 'primereact/button';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import { fetchResourceByIdRequest } from '../../../../redux/actions/resourceActions';
import { workerID } from '../../WorkerId';
import { useDispatch, useSelector } from 'react-redux';
import AddAddress from './AddAddress';
import EditAddress from './EditAddress';

function Address({ active, setActive, setValue }) {
    const toast = useRef(null);
    const dispatch = useDispatch()
    const { selectedResource } = useSelector((state) => state.resource);
    const personAddress = selectedResource?.personLegal?.personAddress

    const [addressData, setAddressData] = useState({}); // State to hold the address being edited
    const [editedAddress, setEditedAddress] = useState(null);
    console.log(editedAddress);
    const handleUpdateAddress = (data) => {
        setEditedAddress(data);
        setIsEdit(false); 
    };


    useEffect(() => {
        if (personAddress && personAddress.length > 0) {
            setAddressData(personAddress[0]); 
        }
    }, [personAddress]);

    useEffect(() => {
        // const workerID = '353ef016-08d2-4889-a0dd-f6d74d38320a';
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);

    console.log(personAddress, 'personAddress')

    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const handleEdit = () => {
        setIsEdit(true);
        setActive('all')
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
    };

    const addAddressActionHandler = () => {
        // Logic to handle opening the add address viewer/sidebar
        setIsAdd(true);
    };


    return (
        <>

            <div>
                <div className="company-main-text fs-6 pt-3 pb-2 fw-bold border-bottom d-flex justify-content-between align-items-center">
                    <div className='name-view-heading'>Address</div>

                    {personAddress ? (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                        </div>
                    ) : (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <Button icon='pi  pi-plus fw-normal fs-5' size='small' severity='primary' onClick={addAddressActionHandler} />
                        </div>
                    )}
                </div>
                <Toast ref={toast} />

                {isAdd && (
                    <Viewer
                        visible={isAdd}
                        onHide={() => setIsAdd(false)}
                        header={
                            <TitleHeaderOnly
                                onClick={() => setIsAdd(false)}
                                title={"Add Address"}
                            />
                        }
                        contentComponent={
                            <AddAddress setAddSidebarVisible={setIsAdd} />
                        }
                    />
                )}


                {isEdit && (
                    <Viewer
                        visible={isEdit}
                        onHide={() => setIsEdit(false)}
                        header={
                            <TitleHeaderOnly
                                onClick={() => setIsEdit(false)}
                                title={"Edit Address"}
                            />
                        }
                        contentComponent={
                            <EditAddress
                                selectedResource={selectedResource}
                                address={addressData} // Pass the address to be edited
                                onUpdate={handleUpdateAddress}
                                handleCancelEdit={handleCancelEdit} />
                        }
                    />
                )}

                {!isEdit && !personAddress && (
                    <div>
                        <p>Data is not available</p>
                    </div>
                )}

                {personAddress && (
                    <>

                        <div className="formgrid grid m-2">
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Label</label>
                                <p className="p-text-primary">{addressData.addressName}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Address Type</label>
                                <p className="p-text-primary">{addressData.addressType}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Address 1</label>
                                <p className="p-text-primary">{addressData.address1}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Address 2</label>
                                <p className="p-text-primary">{addressData.address2}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>City</label>
                                <p className="p-text-primary">{addressData.city}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>State</label>
                                <p className="p-text-primary">{addressData.state}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Country</label>
                                <p className="p-text-primary">{addressData?.country?.countryName}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Zip code</label>
                                <p className="p-text-primary">{addressData.postalCode}</p>
                            </div>


                        </div>
                    </>
                )}






            </div>




        </>
    )
}

export default Address