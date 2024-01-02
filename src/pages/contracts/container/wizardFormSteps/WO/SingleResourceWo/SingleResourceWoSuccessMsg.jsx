import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import LoginLogo from '../../../../../../assets/images/SuccessIcon.svg';
function SingleResourceWoSuccessMsg({ setCurrentStep, currentStep, setContractsSuccessMsg, handleOnHide,setSkip }) {

  useEffect(()=>{
    setContractsSuccessMsg(true);
    setSkip(false);
  },[setContractsSuccessMsg,setSkip])
  const handleNo = ()=>{
    handleOnHide()
    setCurrentStep(0)
    setContractsSuccessMsg(false);
  }
  return (
    <div>
      <div className="jumbotron ">
        <div className="col-md-12 text-center ">
          <img src={LoginLogo} className="mt-3 p-5" alt='LoginLogo' />
          <h4 className="fw-bold text-center p-2">WO Created Successfully</h4>
          <h5 className="fw-bold text-center p-3">Do you want add additional Info for this MSA?</h5>
          <div className=' container d-flex justify-content-center align-items-center'>
            <div className='d-flex col-2 gap-4' >
              <Button
                type="button"
                size="small"
                label="No"
                severity="secondary"
               onClick={handleNo}
              > 
              </Button>
              <Button
                label="Yes"
                size="small"
              onClick={() =>{setContractsSuccessMsg(false);setCurrentStep(currentStep + 1);}}
              >  
              </Button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
export default SingleResourceWoSuccessMsg;