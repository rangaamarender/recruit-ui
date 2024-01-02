import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

const HoursStatusTableView = () => {
  const tableData = {
    startDate: "2023-11-15",
    endDate: "2023-11-28",
    totalHours: 40,
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
      { day6: { 1: 0, 2: 0 } },
      { day7: { 1: 0, 2: 0 } },
    ],
  };

  if (!tableData) {
    return null;
  }

  const {
    startDate,
    endDate,
    totalHours,
    taskDescriptions,
    taskHours,
  } = tableData;

  const statusLegend = [
    { color: '#00CC00', label: 'Approved' },
    { color: '#FFD700', label: 'Pending Approval' },
    { color: '#FF0000', label: 'Not Uploaded' },
  ];

  const renderInputFields = (
    startDate,
    endDate,
    totalHours,
    taskDescriptions,
    taskHours
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let tables = [];

    while (start <= end) {
      const weekEndDate = new Date(start);
      weekEndDate.setDate(weekEndDate.getDate() + 6);

      const headerDates = [];
      for (let date = new Date(start); date <= weekEndDate; date.setDate(date.getDate() + 1)) {
        const dayNumber = date.getDate().toString().padStart(2, '0');
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        headerDates.push(`${dayNumber} ${dayName}`);
      }

      const dayHeaders = headerDates.map(day => <th key={`header-${day}`}>{day}</th>);

      const calculateDayTotal = (dayIndex, taskId) => {
        return taskHours[dayIndex][`day${dayIndex + 1}`][taskId] || 0;
      };

      const calculateOverallTotal = (taskId) => {
        let total = 0;
        for (let dayIndex = 0; dayIndex < taskHours.length; dayIndex++) {
          total += parseFloat(taskHours[dayIndex][`day${dayIndex + 1}`][taskId]) || 0;
        }
        return total.toFixed(2);
      };

      const getStatusColor = (hours) => {
        if (hours > 0) {
          // Pending Approval
          return "#FFD700";
        } else if (hours === 0) {
          // Not Entered
          return "#FF0000";
        } else {
          // Approved
          return "#00CC00";
        }
      };

      tables.push(
        <div key={`week-${start.getTime()}`}>
          <div className='d-flex'>
            <p>Week : </p>
            <p> {start.toISOString().split('T')[0]} to {weekEndDate.toISOString().split('T')[0]}</p>
          </div>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th></th>
                {dayHeaders}
                <th>Overall Total</th>
              </tr>
            </thead>
            <tbody>
              {taskDescriptions.map((task) => (
                <React.Fragment key={task.id}>
                  <tr>
                    <th>{task.description}</th>
                    {taskHours.map((hours, dayIndex) => (
                      <td key={`input-${dayIndex}`}>
                        <InputNumber
                          value={calculateDayTotal(dayIndex, task.id)}
                          disabled={true}
                          className='hours-inputtext'
                          minFractionDigits={1}
                          style={{
                            borderRadius: '8px',
                            backgroundColor: getStatusColor(
                              calculateDayTotal(dayIndex, task.id)
                            ),
                          }}
                        />
                      </td>
                    ))}
                    <td>{calculateOverallTotal(task.id)}</td>
                  </tr>
                </React.Fragment>
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
                          parseFloat(taskHours[dayIndex][`day${dayIndex + 1}`][task.id]) || 0,
                        0
                      )}
                      minFractionDigits={1}
                      disabled
                      style={{
                        borderRadius: '8px',
                        backgroundColor: getStatusColor(
                          taskDescriptions.reduce(
                            (total, task) =>
                              total +
                              parseFloat(
                                taskHours[dayIndex][`day${dayIndex + 1}`][task.id]
                              ) || 0,
                            0
                          )
                        ),
                      }}
                    />
                  </td>
                ))}
                <td>{totalHours}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

      // Move to the next week, starting from Monday
      start.setDate(start.getDate() + 7);
      start.setDate(start.getDate() - start.getDay() + 1); // Adjust to Monday if not already
    }

    return (
      <div>
        {tables}
      </div>
    );
  };

  return (
    <>
      <div className='p-3 border rounded mb-3'>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {statusLegend.map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div className=''
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  marginRight: '8px',
                }}
              ></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        {renderInputFields(startDate, endDate, totalHours, taskDescriptions, taskHours)}
      </div>
    </>
  );
};

export default HoursStatusTableView;
