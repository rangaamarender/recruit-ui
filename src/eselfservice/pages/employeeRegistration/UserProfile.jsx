import React from 'react';
import { FileUpload } from 'primereact/fileupload';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomInputMask from '../../../components/controls/CustomInputMask';
import CustomCalender from '../../../components/controls/CustomCalender';


function UserProfile({ control, errors }) {
  const required = false;

  const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob());

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      // const base64data = reader.result;
    };
  };


  return (
    <>
      <div class="formgrid grid mb-6">
        <div class="col-6">
          <CustomInputText
            control={control}
            errors={errors}
            name="FirstName"
            labelId="firstName"
            defaultValue=""
            required={required}
            requiredMsg="firstName.required"
            placeholder="Last Name"
            autoFocus
          />
          <CustomInputText
            control={control}
            errors={errors}
            name="lastName"
            labelId="LastName"
            defaultValue=""
            requiredMsg="lastName.required"
            placeholder="Last Name"
          />
        </div>
        <div className='col-6 mt-4'>
          <div className='profilepic-border rounded p-5  d-flex justify-content-center align-items-center'>
            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUploaduploadHandler={customBase64Uploader} className='custom-calander-bg m-3' />
          </div>
        </div>

        <div class=" col-12 md:col-6">
          <CustomCalender
            control={control}
            errors={errors}
            name="DOB"
            labelId="DOB"
            requiredMsg="endDate.required"
            defaultValue=""
            showIcon={true}
            required={required}

          />
        </div>
        <div class=" col-12 md:col-6">
          <CustomInputMask
            control={control}
            errors={errors}
            name="ssnNumber"
            labelId="ssnNumber.label"
            defaultValue=""
            mask="999-99-9999"
            required={required}
            requiredMsg="ssnNumber.required"
          />
        </div>
        <div class=" col-12 md:col-6">
          <CustomInputText
            control={control}
            errors={errors}
            name="dlNumber"
            labelId="Dl Number"
            defaultValue=""
            required={required}
            requiredMsg="ssnNumber.required"
          />
        </div>
        <div class=" col-12 md:col-6">
          <CustomCalender
            control={control}
            errors={errors}
            name="licenceExp"
            labelId="Licence-Exp"
            requiredMsg="endDate.required"
            defaultValue=""
            showIcon={true}
            required={required}
          />
        </div>
      </div>
    </>
  );
}

export default UserProfile;
