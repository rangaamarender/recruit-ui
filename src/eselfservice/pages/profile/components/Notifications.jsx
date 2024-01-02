import { InputSwitch } from 'primereact/inputswitch'
import React, { useState } from 'react'

function Notifications() {

  const [checked, setChecked] = useState(false);

  const handleTextClick = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <div className=''>
      
          <h4>Notification Settings</h4>
          <p>You will get only notification what have enabled.</p>


          <div>

            <div className='mt-5'>
              <h6>Security Alerts</h6>
              <p>You will get only those email notification what you want.</p>
            </div>


            <div className="flex items-center">
              <InputSwitch checked={checked}
               onChange={(e) => setChecked(e.value)}
               />
              <span className="ml-2 cursor-pointer" onClick={handleTextClick}>
              Email me if new browser is used to sign in
              </span>
            </div>
            <div className="flex items-center mt-2">
              <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
              <span className="ml-2 cursor-pointer" onClick={handleTextClick}>
              You will get only those email notification what you want.
              </span>
            </div>

            
          </div>

          <div>

            <div className='mt-5'>
              <h6>News</h6>
              <p>You will get only those email notification what you want.</p>
            </div>


            <div className="flex items-center">
              <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
              <span className="ml-2 cursor-pointer" onClick={handleTextClick}>
              Notify me by email about sales and latest news
              </span>
            </div>
            <div className="flex items-center mt-2">
              <InputSwitch checked={""} onChange={(e) => setChecked(e.value)} />
              <span className="ml-2 cursor-pointer" onClick={handleTextClick}>
              Email me about new features and updates
              </span>
            </div>
            <div className="flex items-center mt-2">
              <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
              <span className="ml-2 cursor-pointer" onClick={handleTextClick}>
              Email me about tips on using account
              </span>
            </div>

            
          </div>
      </div>
    </div>
  )
}

export default Notifications