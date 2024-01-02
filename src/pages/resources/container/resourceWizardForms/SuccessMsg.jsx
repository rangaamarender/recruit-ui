import React from 'react'
import { useEffect } from 'react'
import checkSuccessIcon from "../../../../assets/images/checkSuccessIcon.svg";

const SuccessMsg = ({ setFinish, formData }) => {

    useEffect(() => {
        setFinish(true)
    })

    console.log("Resource profile Form : ",formData);

    return (
        <div>
            <div className="col-md-12 text-center mt-5 ">
                <img src={checkSuccessIcon} className='cursor-pointer mb-4' alt="Company Logo" />

                {/* <h1 className=""><i className="pi pi-verified bg-primary-reverse" style={{ fontSize: "3rem" }}></i></h1> */}
                <h4 className="text-center">Resource Successfully Created</h4>
            </div>
        </div>
    )
}

export default SuccessMsg