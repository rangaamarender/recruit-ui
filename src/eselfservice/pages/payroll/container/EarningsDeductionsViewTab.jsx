import React from 'react';
// import personalInformation from "./../../../assets/__mockData__/personalInformation.json"
import { RiPencilFill } from 'react-icons/ri';
import { useState } from 'react';
import { Button } from 'primereact/button';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomCalender from '../../../../components/controls/CustomCalender';
import { useForm } from 'react-hook-form';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomEditor from '../../../../components/controls/CustomEditor';


function EarningsDeductionsViewTab({ rowData }) {

  const data = rowData?.data || {};

  
  // const { control, handleSubmit, formState: { errors } } = useForm();
  const [isEdit, setIsEdit] = useState(false);

  const required = false

  const { control, handleSubmit, formState: { errors }, setValue } = useForm();


  const categoryOptions = [
      { value: 'earnings', label: 'Earnings' },
      { value: 'deductions', label: 'Deductions' }
  ];
  const typeOptions = [
      { value: 'fixed', label: 'Fixed' },
      { value: 'variable', label: 'Variable' }
  ];
  const frequencyOptions = [
      { value: 'hourly', label: 'Hourly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly' },
      
  ];


  const onSubmit = (data) => {
    setIsEdit(false);
    // setActive("all")

    // toast.current.show({
    //     severity: 'success',
    //     summary: 'Success Message',
    //     detail: 'Profile information updated successfully!',
    //   });
};

const handleEdit = () => {
    setIsEdit(true);
    // setActive('editProfileDetails')
};

const handleCancelEdit = () => {
    setIsEdit(false);
    // setActive("all")
};

  return (
    <div>
      {Object.keys(data).length > 0 && (
        <>

          <div className='fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2'>
            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
              <div className='name-view-heading'>Earnings & Deductions</div>
              {!isEdit && (
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                </div>
              )}

            </div>
            {/* <Toast ref={toast} /> */}
            {isEdit ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formgrid grid p-3">
               
               <div className="col-12 md:col-6">
                   <CustomDropdown
                       control={control}
                       errors={errors}
                       name="category"
                       labelId="Category"
                       defaultValue={data.category}
                       options={categoryOptions}
                       required={required}
                       placeholder=""
                       requiredMsg=""
                   />
               </div>
               <div className="col-12 md:col-6">
                   <CustomInputText
                       control={control}
                       errors={errors}
                       name="name"
                       labelId="Name"
                       defaultValue={data.name}
                       placeholder=""
                       required={required}
                       requiredMsg=""
                   />
               </div>
               <div className="col-12 md:col-12">
                   <CustomEditor
                       control={control}
                       errors={errors}
                       name="description"
                       labelId="description.label"
                       defaultValue={data.description}
                       style={{ height: "150px" }}
                       onTextChange={(e) => setValue("description", e.htmlValue)}
                   />
               </div >
               <div className="col-12 md:col-4">
                   <CustomDropdown
                       control={control}
                       errors={errors}
                       name="type"
                       labelId="Type"
                       defaultValue={data.type}
                       options={typeOptions}
                       required={required}
                       placeholder=""
                       requiredMsg=""
                   />
               </div>
               <div className="col-12 md:col-4">
                   <CustomInputText
                       control={control}
                       errors={errors}
                       name="rate"
                       labelId="Rate"
                       defaultValue={data.rate}
                       placeholder=""
                       required={required}
                       requiredMsg=""
                   />
               </div>


               <div className="col-12 md:col-4">
                   <CustomDropdown
                       control={control}
                       errors={errors}
                       name="frequency"
                       labelId="Frequency"
                       defaultValue={data.frequency}
                       options={frequencyOptions}
                       required={required}
                       placeholder=""
                       requiredMsg=""
                   />
               </div>
               <div className="col-12 md:col-6 mb-6">
                   <CustomCalender
                       control={control}
                       errors={errors}
                       name="startDate"
                       labelId="startDate.label"
                       defaultValue={data.startDate}
                       required={required}
                       requiredMsg='startDate.required'
                       showIcon={true}
                   />
               </div>
               <div className="col-12 md:col-6 mb-6">
                   <CustomCalender
                       control={control}
                       errors={errors}
                       name="endDate"
                       labelId="endDate.label"
                       defaultValue={data.endDate}
                       required={required}
                       requiredMsg='endDate.required'
                       showIcon={true}
                   />
               </div>
               </div>
               <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 p-sidebar-header p-3 h-custom-10'>
                    <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancelEdit} />
                    <Button type="submit" severity='primary' label='Update' size='small' className="ms-2 me-2" />
                </div>
                </form>
              </>
            ) : (
              <>
                <div className="formgrid grid m-2">
                  <div className="col-12 md:col-6">
                    <label className="p-text-secondary">Category</label>
                    <p className="p-text-primary">{data.category}</p>
                  </div>
                  <div className="col-12 md:col-6">
                    <label className="p-text-secondary">Name</label>
                    <p className="p-text-primary">{data.name}</p>
                  </div>
                  <div className="col-12 md:col-6">
                    <label className="p-text-secondary">Description</label>
                    <p className="p-text-primary">{data.description}</p>
                  </div>
                  <div className="col-12 md:col-6">
                    <label className="p-text-secondary">Type</label>
                    <p className="p-text-primary">{data.type}</p>
                  </div>
                  <div className="col-12 md:col-6">
                    <label className="p-text-secondary">Rate</label>
                    <p className="p-text-primary">{data.rate}</p>
                  </div>
                  <div className="col-12 md:col-6">
                    <label className="p-text-secondary">Frequency</label>
                    <p className="p-text-primary">{data.frequency}</p>
                  </div>
                  <div className="col-12 md:col-6">
                    <label className="p-text-secondary">Start Date</label>
                    <p className="p-text-primary">{data.startDate}</p>
                  </div>
                  <div className="col-12 md:col-6">
                    <label className="p-text-secondary">End Date</label>
                    <p className="p-text-primary">{data.endDate}</p>
                  </div>

                </div>
              </>
            )}

          </div>
          {/* <>
            <div className="formgrid grid m-2">
              <div className="col-12 md:col-6">
                <label className="p-text-secondary">Category</label>
                <p className="p-text-primary">{data.category}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className="p-text-secondary">Name</label>
                <p className="p-text-primary">{data.name}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className="p-text-secondary">Description</label>
                <p className="p-text-primary">{data.description}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className="p-text-secondary">Type</label>
                <p className="p-text-primary">{data.type}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className="p-text-secondary">Rate</label>
                <p className="p-text-primary">{data.rate}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className="p-text-secondary">Frequency</label>
                <p className="p-text-primary">{data.frequency}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className="p-text-secondary">Start Date</label>
                <p className="p-text-primary">{data.startDate}</p>
              </div>
              <div className="col-12 md:col-6">
                <label className="p-text-secondary">End Date</label>
                <p className="p-text-primary">{data.endDate}</p>
              </div>
            
            </div>
          </> */}


        </>
      )}

    </div>
  );
}

export default EarningsDeductionsViewTab;
