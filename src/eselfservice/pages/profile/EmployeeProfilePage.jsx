import React, { useEffect, useState } from 'react'
import ProfileMenuItems from './config/ProfileMenuItemSidebar';
import ToogleLayoutwithHeader from '../../../components/layouts/ToogleLayoutwithHeader';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import { useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import EmployeeProfilePicture from './components/EmployeeProfilePicture';


function EmployeeProfilePage() {
  //   const sidebarStyle = {
  //     marginLeft: '-1.5vw',
  //     marginTop: '-1.2vh',
  // };
  const [visible, setVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null); // Manage selected image state

  const handleImageSelection = (image) => {
      // Logic to set the selected image
      setSelectedImage(image);
      setVisible(true); // Show the dialog when an image is selected
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageName('Profile'));
  }, [dispatch]);

  const handleCameraClick = () => {
    // Open the modal when camera icon is clicked
    setVisible(true);
  };

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <>
      <ToogleLayoutwithHeader
        menuItems={ProfileMenuItems}
        selectedItem="Personal Information"
        avatar={user.name.slice(0, 1)}
        name={user.name}
        email={user.email}
        handleClick={handleCameraClick}
        handleImageSelection={handleImageSelection}
      />;
      <Dialog header="Change Profile Picture" visible={visible} onHide={() => setVisible(false)}
          pt={{
            root: { className: 'w-8 sm:w-6 md:w-4' }
        }}
        >
       <EmployeeProfilePicture setVisible={setVisible} selectedImage={selectedImage} />
      </Dialog>


    </>

  );
}

export default EmployeeProfilePage;