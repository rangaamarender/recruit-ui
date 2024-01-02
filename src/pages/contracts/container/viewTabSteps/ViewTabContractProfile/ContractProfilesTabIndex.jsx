import React from "react";
import { useState } from "react";
import ContractProfileTabMode from "./ContractProfilesTabMode";

const ContractProfilesTabIndex = () => {
  const [active, setActive] = useState("readMode")
  return (
    <>
      <>
        {active === "readMode" &&
          <>
            <ContractProfileTabMode setActive={setActive} active={active} />
          </>
        }
      </>
      <>
        {active === 'editProfileDetails' &&
          <ContractProfileTabMode setActive={setActive} active={active} />

        }

      </>

    </>
  )
};

export default ContractProfilesTabIndex;