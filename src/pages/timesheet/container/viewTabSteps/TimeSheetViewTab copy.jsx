import React from 'react';
import { useSelector } from 'react-redux';
// import EntityDashboardCounts from '../../../components/dashboard/EntityDashboardCounts';
// import timesheetViewerDashboardCount from '../config/timesheetViewerDashboardCount';

function TimeSheetViewTab({ rowData }) {
  // Access properties through rowData.data
  const data = rowData || {};

  const selectedTimesheet = useSelector((state) => state.timesheet.selectedTimesheet);

  console.log("===selectedTimesheet===", selectedTimesheet)

  
  return (
    <div>
      {/* <EntityDashboardCounts widgetList={timesheetViewerDashboardCount} />
      <hr /> */}

      <>
        <div class="container mt-2">
          <div class="row">
            <div class="col-sm-5 col-md-6">
              <label>Resource name</label>
              <p className='fw-bold'>{selectedTimesheet.worker.personLegal.givenName}</p>
            </div>
            <div class="col-sm-5 col-md-6">
              <label>Role</label>
              <p className='fw-bold'>{selectedTimesheet.worker.workerType.workerTypeName}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5 col-md-6">
              <label>Contract ID</label>
              <p className='fw-bold'>{selectedTimesheet.contract.contractID}</p>
            </div>
            <div class="col-sm-5 col-md-6">
              <label>Contract Title</label>
              <p className='fw-bold'>{selectedTimesheet.contract.contractName}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5 col-md-6">
              <label>WorkOrder ID</label>
              <p className='fw-bold'>{selectedTimesheet.contract.workOrder.workOrderID}</p>
            </div>
            <div class="col-sm-5 col-md-6">
              <label>WorkOrder Name</label>
              <p className='fw-bold'>{selectedTimesheet.contract.workOrder.workorderName}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-5 col-md-6">
              <label>Start Date</label>
              <p className='fw-bold'>{selectedTimesheet.contract.workOrder.startDate}</p>
            </div>
            <div class="col-sm-5 col-md-6">
              <label>End Date</label>
              <p className='fw-bold'>{selectedTimesheet.contract.workOrder.endDate}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5 col-md-6">
              <label>Total Hours</label>
              <p className='fw-bold'>{selectedTimesheet.contract.workOrder.totalHours}</p>
            </div>
          </div>
        </div>
      </>
    </div>

  );
}

export default TimeSheetViewTab;
