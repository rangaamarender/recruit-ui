import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';
import _ from 'lodash';
import { Toast } from 'primereact/toast';

const EditContactDetails = ({ setActive }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const toast = useRef(null)

  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  // const { companies, loading, error,} = useSelector((state) => state.company);

  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const action = useSelector((state) => state.company.action);

  const createPayload = (updatedOrgCommunications) => {
    return {
      organizationID: selectedCompany.organizationID,
      orgCommunications: updatedOrgCommunications.map((item) => ({
        authSignataryFn: item.authSignataryFn,
        authSignataryLn: item.authSignataryLn,
        authSignataryEmail: item.authSignataryEmail,
        authSignataryPhone: item.authSignataryPhone,
      })),
    };
  };

  const onSubmit = (data) => {
    const updatedOrgCommunications = _.map(selectedCompany.orgCommunications, (item, index) =>
      _.merge({}, item, data.orgCommunications[index]));

    const payload = createPayload(updatedOrgCommunications);

    dispatch(updateCompanyRequest(selectedCompany.organizationID, payload));
    setIsEdit(false);
    setActive('all');

    // toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Contact Details Updated Successfully' })
  };

  const handleEdit = () => {
    setIsEdit(true);
    setActive('editContactDetails');
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setActive('all');
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
        <div className="name-view-heading">Contact Details</div>
        {!isEdit && action !== 'view' && (
          <div className="d-flex justify-content-between align-items-center gap-3">
            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
          </div>
        )}
      </div>
      {isEdit ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {selectedCompany.orgCommunications.map((item, index) => (
            <div className="formgrid grid p-3" key={index}>
              <div className="col-12 md:col-6">
                <CustomInputText
                  control={control}
                  errors={errors}
                  name={`orgCommunications[${index}].authSignataryFn`}
                  labelId="authSignataryFn"
                  defaultValue={item.authSignataryFn}
                  required={false}
                  placeholder="First Name"
                  autoFocus
                />
              </div>
              <div className="col-12 md:col-6">
                <CustomInputText
                  control={control}
                  errors={errors}
                  name={`orgCommunications[${index}].authSignataryLn`}
                  labelId="authSignataryLn"
                  defaultValue={item.authSignataryLn}
                  placeholder="Last Name"
                />
              </div>
              <div className="col-12 md:col-6">
                <CustomInputText
                  control={control}
                  errors={errors}
                  name={`orgCommunications[${index}].authSignataryEmail`}
                  labelId="authSignataryEmail"
                  placeholder="admin@tech.com"
                  defaultValue={item.authSignataryEmail}
                />
              </div>
              <div className="col-12 md:col-6">
                <CustomInputPhoneNbr
                  control={control}
                  errors={errors}
                  name={`orgCommunications[${index}].authSignataryPhone`}
                  labelId="authSignataryPhone"
                  maskFormat="(999) 999-9999"
                  defaultValue={item.authSignataryPhone}
                  required={false}
                />
              </div>
              <div className='p-sidebar-header col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3'>
                <Button type="button" severity='secondary' label='Cancel' size='small' className="" onClick={handleCancelEdit} />
                <Button type="submit" severity='primary' label='Update' size='small' className="ms-2 me-2" />
              </div>
            </div>
          ))}
        </form>
      ) : (
        <>
          {selectedCompany?.orgCommunications?.map((item, index) => (
            <div key={index} className="formgrid grid m-2">
              <div className="col-12 md:col-6">
                <label className='p-text-secondary'>Auth. Signatory First Name (CEO or President)</label>
                <p className="p-text-primary">{item.authSignataryFn}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className='p-text-secondary'>Last Name</label>
                <p className="p-text-primary">{item.authSignataryLn}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className='p-text-secondary'>Auth. Signatory Email (CEO or President)</label>
                <p className="p-text-primary">{item.authSignataryEmail}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className='p-text-secondary'>Auth. Signatory Phone (CEO or President)</label>
                <p className="p-text-primary">{item.authSignataryPhone}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default EditContactDetails;
