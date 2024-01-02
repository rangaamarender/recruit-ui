import React, { useState } from 'react';
import { RadioButton } from "primereact/radiobutton";
import { constractSteps } from '../../../../../redux/actions/contractActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function SingleMultipleResourceWo() {
  const [resources, setResources] = useState('singleResource'); // Set the default value to 'singleResource'
  const [rates, setRates] = useState('');
  const dispatch = useDispatch();
  
  const handleResourcesChange = (e) => {
    const selectedResource = e.value;
    setResources(selectedResource);
    dispatch(constractSteps('singleResourceWoSwitch'));

    // If "Single Resource" is selected, clear the rates selection.
    if (selectedResource === 'singleResource') {
      setRates('');
      dispatch(constractSteps('singleResourceWoSwitch'));
    } else if (selectedResource === 'multipleResources') {
      setRates('multipleResource1');
      dispatch(constractSteps('multipleResourceWoIndividualSwitch'));
    }
  };
useEffect(()=>{
  dispatch(constractSteps('singleResourceWoSwitch'));
},[dispatch]);
  const renderRates = () => {
    if (resources === 'multipleResources') {
      return (
        <>
          <h4 className="fw-bold text-center">Selected rates</h4>
          <div className="col-12 mt" style={{paddingLeft:'20rem'}}>
          <div className='centered-container col-md-6 pl-2' style={{display:"block"}}>
            <div className="d-flex justify-content-sm-between align-items-center">
              <label htmlFor="rates1" className="mr-2 pr-4">Individual Rate</label>
              <RadioButton inputId="rates1" name="rate" value="multipleResource1"
               onChange={(e) => {setRates(e.value); dispatch(constractSteps('multipleResourceWoIndividualSwitch'))}}
               checked={rates === 'multipleResource1'} />
            </div>
            </div>
          </div>
          <div className="col-12" style={{paddingLeft:'20rem'}}>
          <div className='centered-container col-md-6 pl-2' style={{display:"block" , margin:"0rem"}}>
            <div className="d-flex justify-content-sm-between align-items-center">
              <label htmlFor="rates2" className="mr-2 pr-5">Blended Rates</label>
              <RadioButton inputId="rates2" name="rate" value="multipleResource2" onChange={(e) => {setRates(e.value);dispatch(constractSteps('multipleResourceWoBlendedSwitch'))}} checked={rates === 'multipleResource2'} />
            </div>
            </div>
          </div>
          
        </>
      );
    }
    return null;
  };

  return (
    <>
  
   
           <h4 className="fw-bold text-center">Worker Types</h4>
      <div className="col-12" style={{paddingLeft:'20rem'}}>
        
        <div className='centered-container col-md-6 pl-2' style={{display:"block",margin:"0rem"}}>
        <div className="d-flex justify-content-sm-between align-items-center">
          <label htmlFor="resources1" 
          // className="mr-2 pr-6"
          >Single Resource</label>
          <RadioButton inputId="resources1" name="resource" value="singleResource" onChange={handleResourcesChange} checked={resources === 'singleResource'} />
        </div>
        </div>
      </div>
      <div className="col-12" style={{paddingLeft:'20rem'}}>
      <div className='centered-container col-md-6 pl-2' style={{display:"block"}}>
        <div className="d-flex justify-content-sm-between align-items-center">
          <label htmlFor="resources2" 
          // className="mr-2 pr-4"
          >Multiple Resources</label>
          <RadioButton inputId="resources2" name="resource" value="multipleResources" onChange={handleResourcesChange} checked={resources === 'multipleResources'} />
        </div>
        </div>
      </div>

      {renderRates()}
      
    </>
  );
}