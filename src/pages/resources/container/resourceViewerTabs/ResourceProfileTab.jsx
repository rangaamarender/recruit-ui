import React from "react";
import { useState } from "react";
import EditResourceProfile from "./EditResourceProfile";
import EditResourceContactDetails from "./EditResourceContactDetails";
import EditResourceAddress from "./EditResourceAddress";

const ResourceProfileTab = () => {
  const [active, setActive] = useState("all")
  return (
    <>

      {(active === 'all' || active === 'editResourceProfile') &&
        <EditResourceProfile setActive={setActive} active={active} />}
      {(active === 'all' || active === 'editResourceContactDetails') &&
        <EditResourceContactDetails setActive={setActive} active={active} />}
      {(active === 'all' || active === 'editResourceAddress') &&
        <EditResourceAddress setActive={setActive} active={active} />}

    </>
  )
};

export default ResourceProfileTab;
