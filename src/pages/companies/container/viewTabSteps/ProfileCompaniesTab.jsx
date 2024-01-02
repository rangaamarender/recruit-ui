import React, { useState } from "react";
// import EditAddressDetails from "./EditAddressDetails";
import EditContactDetails from "./EditContactDetails";
import EditDocuments from "./EditDocuments";
import EditDomainDetails from "./EditDomainDetails";
import EditProfileDetails from "./EditProfileDetails";
import EditUserDetails from "./EditUserDetails";

const ProfileCompaniesTab = () => {
  const [active, setActive] = useState("all")
  return (
    <>

      {(active === 'all' || active === 'editProfileDetails') &&
        <EditProfileDetails setActive={setActive} active={active} />}
      {(active === 'all' || active === 'editDomainDetails') &&
        <EditDomainDetails setActive={setActive} active={active} />}
      {(active === 'all' || active === 'editContactDetails') &&
        <EditContactDetails setActive={setActive} active={active} />}
      {/* <>
        {(active === 'all' || active === 'editAddressDetails') &&
          <EditAddressDetails setActive={setActive} active={active} />}
      </> */}

      {(active === 'all' || active === 'editDocuments') &&
        <EditDocuments setActive={setActive} active={active} />}
      {(active === 'all' || active === 'editUserDetails') &&
        <EditUserDetails setActive={setActive} active={active} />}

    </>
  )
};

export default ProfileCompaniesTab;
