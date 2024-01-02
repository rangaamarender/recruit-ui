import React, { useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';

const AdminReusableComp = ({ title, options }) => {
  const [checked, setChecked] = useState(options.map(()=> true));

  const handleSwitch = (index) => {
    const newSwitchStates = [...checked];
    newSwitchStates[index] = !newSwitchStates[index];
    setChecked(newSwitchStates);
  };

  return (
    <div className='row mt-2'>
        <div className='row'>
          <h4 className='mb-4'>{title}</h4>
          <hr></hr>
          {options.map((option, index) => (
            <div key={index}>
              <div className='d-flex justify-content-between'>
                <div>
                  <h6>{option.label}</h6>
                  <p>{option.description}</p>
                </div>
                <div>
                  <InputSwitch
                    checked={checked[index]}
                    onChange={() => handleSwitch(index)}
                  />
                </div>
              </div>
              <hr className='w-100 mt-2 mb-2'></hr>
            </div>
          ))}
        </div>
    </div>
  );
};

export default AdminReusableComp;


