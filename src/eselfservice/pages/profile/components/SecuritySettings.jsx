import { Card } from 'primereact/card'
import { InputSwitch } from 'primereact/inputswitch';
import React from 'react'
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Badge } from 'react-bootstrap';


function SecuritySettings() {

  const [checked, setChecked] = useState(true);
  // const [ingredients, setIngredients] = useState([]);

  // const onIngredientsChange = (e) => {
  //   let _ingredients = [...ingredients];

  //   if (e.checked) _ingredients.push(e.value);
  //   else _ingredients.splice(_ingredients.indexOf(e.value), 1);

  //   setIngredients(_ingredients);
  // };

  return (
    <div className=''>
      <h4>Security Settings</h4>
      <p>These settings will help you to keep your account secure.</p>
      <Card className='mt-6'>
        <div className="d-flex justify-content-between">
          <div>
            <h6>Save my Activity Logs</h6>
            <p>You can save your all activity logs including unusual activity detected.</p>
          </div>
          <div className="justify-content-end">
            <InputSwitch
              checked={checked}
              onChange={(e) => setChecked(e.value)}
            />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <h6>Change Password</h6>
            <p>Set a unique password to protect your account.</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className='me-3 p-text-secondary'>last changed: {"11-9-2023"}</span>
            <Button
              label='Change password'
              size='small'
            />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div className='me-4'>
            <h6>2 Factor Auth &nbsp; <Badge>Enabled</Badge> </h6> 
            <p>Secure your account with 2FA security. When it is activated you will need to enter not only your password,
              but also a special code using app. You will receive this code via mobile application.</p>
          </div>
          <div className="mt-4">
            <Button size='small'
              label='Disable'
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SecuritySettings