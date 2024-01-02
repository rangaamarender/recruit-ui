import React from 'react'
import { Button } from 'primereact/button';
import checkSuccessIcon from "../../../../assets/images/checkSuccessIcon.svg";

const SuccessWarnMsg = ({ setRule, formData }) => {

    console.log(formData, 'ASSIGN-SCRE')

    return (
        <div>
            <div className="col-md-12 text-center ">
                <img src={checkSuccessIcon} className='cursor-pointer mb-4' alt="Company Logo" />

                {/* <h1 className=""><i className="pi pi-verified bg-primary-reverse" style={{ fontSize: "3rem" }}></i></h1> */}
                <h4 className="text-center">Resource Successfully Created</h4>
                <p className="text-center">Do you Want to assign the supplier company to a 1099 or c2c Employee ?</p>
                <div className='d-flex gap-2' style={{ justifyContent: "center" }}>
                    <div>
                        <Button type='button' className="" label="No" severity='secondary' />
                    </div>
                    <div>
                        <Button type='button' className="company-primary-btn" label="Yes"
                        // onClick={()=>setRule("C2CYes")}                        
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SuccessWarnMsg