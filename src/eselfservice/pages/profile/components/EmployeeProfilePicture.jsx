import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import companyIcon from '../../../../assets/images/google-icon.png';
import { Toast } from 'primereact/toast';
import { setSelectedProfilePicture } from '../../../../redux/actions/headerTitleActions';
import { Button } from 'primereact/button';
import addImage from "../../../../assets/images/addImage.svg"
import CustomCropper from '../../../../components/imageCropper/CustomCropper';

const EmployeeProfilePicture = ({ setVisible }) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const selectedProfilePicture = useSelector((state) => state.headerTitle.selectedProfilePicture);
  const [blob, setBlob] = useState(null);
  const [tempSelectedImage, setTempSelectedImage] = useState(selectedProfilePicture);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile picture Updated Successfully',
      life: 3000,
    });
  };

  const getBlob = (blob) => {
    setBlob(blob);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setTempSelectedImage(reader.result);
    });

    if (file) {
      reader.readAsDataURL(file);
      setShowCropper(true);
    }
  };

  const handleCrop = async (e) => {
    e.preventDefault();

    if (blob) {
      const croppedImageUrl = URL.createObjectURL(blob);
      setCroppedImage(croppedImageUrl);
      // dispatch(setSelectedProfilePicture(croppedImageUrl)); // Set the cropped image in Redux
    }

    // showSuccess();
    setShowCropper(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (blob) {
      const croppedImageUrl = URL.createObjectURL(blob);
      setTempSelectedImage(croppedImageUrl);
      dispatch(setSelectedProfilePicture(croppedImageUrl)); // Set the cropped image in Redux
    }

    showSuccess();
    setShowCropper(false);
    setVisible(false)
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempSelectedImage(selectedProfilePicture || companyIcon);
  };

  const handleCancel = () => {
    setVisible(false)
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="grid">
        <div className="col">
          {/* <div className="fw-bold">Profile Picture</div> */}
          <div className="">
            {croppedImage && (
              <div className='text-center'>
                <div className="fw-bold">Preview</div>
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className='w-auto h-auto'
                // style={{ width: '130px', height: '130px', objectFit: 'contain' }}
                />
                <div className="flex justify-content-center gap-2 mt-2">
                  <Button size="small" onClick={handleCancel}>Cancel</Button>
                  <Button size="small" onClick={handleSave}>Upload</Button>
                </div>
              </div>
            )}
            {!showCropper && !croppedImage && (
              <div>
                <div className="image-uploader-container">
                  {tempSelectedImage && (
                    <div className="">
                      <img
                        src={tempSelectedImage}
                        alt="Selected"
                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id='imageInput'
                    onChange={handleImageChange}
                    className="image-input"
                  />
                  <div className="">
                    <img
                      src={addImage}
                      alt="addImage"
                      className=""
                      onClick={() => document.getElementById('imageInput').click()}
                      style={{
                        position: 'absolute',
                        bottom: '-10px',
                        right: '-10px',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {showCropper && (
              <div>
                <CustomCropper
                  getBlob={getBlob}
                  image={tempSelectedImage}
                  onClickCancel={handleCropCancel}
                  onClickSave={handleCrop}
                  buttonLabel="Crop"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfilePicture;
