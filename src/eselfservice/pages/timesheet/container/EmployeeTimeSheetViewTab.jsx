import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

function EmployeeTimeSheetViewTab({ rowData }) {
  const data = rowData?.data || {};

  const tabelData = {
    startDate: "11-06-2023",
    endDate: "11-12-2023",
    totalHours: 40.00,
    taskDescriptions: [
      { id: 1, description: "Task 1 Description" },
      { id: 2, description: "Task 2 Description" },
    ],
    taskHours: [
      { day1: { 1: 4, 2: 3 } },
      { day2: { 1: 5, 2: 2 } },
      { day3: { 1: 0, 2: 4 } },
      { day4: { 1: 4, 2: 6 } },
      { day5: { 1: 6, 2: 2 } },
      { day6: { 1: 1, 2: 1 } },
      { day7: { 1: 0, 2: 2 } },
    ],
  };

  if (!rowData) {
    return null; // Add proper handling when rowData is not available
  }

  const {
    startDate,
    endDate,
    totalHours,
    taskDescriptions,
    taskHours,
  } = tabelData; // use 'tabelData' instead of 'data'

  // const renderWeekHeader = (weekIndex, week) => {
  //   const weekStartDate = new Date(startDate);
  //   weekStartDate.setDate(weekStartDate.getDate() + weekIndex * 7); // Calculate the start date of the week
  //   const weekEndDate = new Date(weekStartDate);
  //   weekEndDate.setDate(weekEndDate.getDate() + 6); // Calculate the end date of the week

  //   return (
  //     <tr key={`week-header-${weekIndex}`}>
  //       <td>Week {weekIndex + 1}</td>
  //       {week.days.map((day, dayIndex) => (
  //         <td key={`day-${dayIndex}`}>{`${day.day} ${day.date}`}</td>
  //       ))}
  //       <td>Total</td>
  //       <td>Start Date</td>
  //       <td colSpan={5}>{`${weekStartDate.toLocaleString('default', { month: 'short' })} ${weekStartDate.getDate()} - ${weekEndDate.getDate()}`}</td>
  //     </tr>
  //   );
  // };

  

  const renderInputFields = (
    startDate,
    endDate,
    totalHours,
    taskDescriptions,
    taskHours
  ) => {
    const calculateDayTotal = (dayIndex, taskId) => {
      return taskHours[dayIndex][`day${dayIndex + 1}`][taskId] || 0;
    };

    const calculateOverallTotal = (taskId) => {
      let total = 0;
      for (let dayIndex = 0; dayIndex < taskHours.length; dayIndex++) {
        total += parseFloat(
          taskHours[dayIndex][`day${dayIndex + 1}`][taskId]
        ) || 0;
      }
      return total.toFixed(2);
    };

   

    return (
      <tbody>
        <tr>
          <td>Week-1</td>
          <td>{"06 Mon"}</td>
          <td>{"07 Tue"}</td>
          <td>{"08 Wed"}</td>
          <td>{"09 Thu"}</td>
          <td>{"10 Fri"}</td>
          <td>{"11 Sat"}</td>
          <td>{"12 Sun"}</td>
          <td>Total</td>
        </tr>
        {taskDescriptions.map((task) => (
          <tr key={task.id}>
            <th>{task.description}</th>
            {taskHours.map((hours, dayIndex) => (
              <td key={`input-${dayIndex}`}>
                <InputNumber
                  value={calculateDayTotal(dayIndex, task.id)}
                  disabled={true}
                  className='hours-inputtext'
                  minFractionDigits={1}
                />
              </td>
            ))}
            <td>{calculateOverallTotal(task.id)}</td>
          </tr>
        ))}
        <tr>
          <th>Overall Total</th>
          {taskHours.map((hours, dayIndex) => (
            <td key={`overall-total-${dayIndex}`}>
              <InputNumber
                className='hours-inputtext'
                value={taskDescriptions.reduce(
                  (total, task) =>
                    total +
                    parseFloat(
                      taskHours[dayIndex][`day${dayIndex + 1}`][task.id]
                    ) ||
                    0,
                  0
                )}
                minFractionDigits={1}
                disabled
              />
            </td>
          ))}
          <td>{totalHours}</td>
        </tr>
      </tbody>
    );
  };

  return (
    <div>
      {Object.keys(data).length > 0 && (
        <>
      
          <div class="container mt-2">
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Contract ID</label>
                <p className='p-text-primary'>{data.contractID}</p>
              </div>
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Contract Title</label>
                <p className='p-text-primary'>{data.contractTitle}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Start Date</label>
                <p className='p-text-primary'>{data.startDate}</p>
              </div>
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>End Date</label>
                <p className='p-text-primary'>{data.endDate}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Total Hours</label>
                <p className='p-text-primary'>{data.totalHours}</p>
              </div>
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Status</label>
                <p className='p-text-primary'>{data.status}</p>
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <table className='table table-bordered'>
              {renderInputFields(
                startDate,
                endDate,
                totalHours,
                taskDescriptions,
                taskHours
              )}
            </table>
          </div>
          
        </>
      )}
      
    </div>
  );
}

export default EmployeeTimeSheetViewTab;
