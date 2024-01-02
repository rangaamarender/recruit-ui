import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import Widget from '../../../../components/dashboard/Widget';
import { useDispatch } from 'react-redux';
import { hoursStepValidationFunction } from '../../../../redux/actions/timesheetActions';


function calculateTotalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference + 1;
}

function EmployeeHoursStep({
  formData,
  setFormData,
  watch,
  currentStep,
  setCurrentStep,
  setFinish,
  updateFinalstepState,
  isCheckboxChecked,
  setIsCheckboxChecked,
}) {
  const toast = useRef(null);
  const dispatch = useDispatch();

  const contractData = formData.selectedContract;
  const chargeCode = contractData.chargeCode;
  const selectedTimings = chargeCode.tasks.map(task => `${chargeCode.chargeCodeId} : ${task.taskDescription}`);
  const totalHours = formData.totalHours

  console.log(contractData, "1111")
  const selectedDates = {
    startDate: watch("startDate"),
    endDate: watch("endDate")
  }
  const totalDays = calculateTotalDays(selectedDates.startDate, selectedDates.endDate)
  const [weekData, setWeekData] = useState([]);


  useEffect(() => {
    if (formData.weekData) {
      setWeekData(formData.weekData);
    }
  }, [formData.weekData]);

  useEffect(() => {
    setFinish(true)
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const handleCheckboxClick = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
    isCheckboxChecked && setFinish(false)
    updateFinalstepState(!isCheckboxChecked);
  };


  useEffect(() => {
    if (isCheckboxChecked) {
      setFinish(false)
    } else {
      setFinish(true)
    }
  }, [isCheckboxChecked])// eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (weekIndex, dayIndex, timing, value) => {
    setWeekData((prevWeekData) => {
      const updatedWeekData = [...prevWeekData];
      const parsedValue = validateHours(value);
      updatedWeekData[weekIndex].days[dayIndex][timing] = parsedValue;
      updatedWeekData[weekIndex].total[timing] = calculateTotal(updatedWeekData[weekIndex].days, timing);

      // Create an array to hold timeCardItems
      const timeCardItems = [];
      updatedWeekData.forEach((week, weekIndex) => {
        const { startDate } = selectedDates;
        week.days.forEach((day, dayIndex) => {
          const itemDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, "0")}-${day.date.toString().padStart(2, "0")}`;

          // Iterate through each task in chargeCode and include all taskIds
          chargeCode.tasks.forEach((task) => {
            const taskId = task.taskId;
            const hours = day[timing];
            if (hours >= 0) {
              const timeCardItem = {
                itemDate,
                chargeCodeTask: { taskId: taskId },
                hours: hours.toString(),
              };
              timeCardItems.push(timeCardItem);
            }
          });
        });
      });

      // Update formData with the entered values
      const updatedFormData = {
        ...formData,
        // weekData: updatedWeekData,
        // timeCardItems, // Add the timeCardItems to formData
      };

      setFormData(updatedFormData);

      return updatedWeekData;
    });
  };

  const validateHours = (value) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 24 ? parsedValue : '';
  };

  const calculateTotal = (days, timing) => {
    let total = 0;
    days.forEach((day) => {
      const value = parseFloat(day[timing]);
      if (!isNaN(value)) {
        // Convert decimal value to hours and minutes
        const hours = Math.floor(value);
        const minutes = (value - hours) * 60;
        total += hours + minutes / 60; // Convert minutes to hours
      }
    });
    return total;
  };

  const generateWeekData = () => {
    setWeekData([])
    const { startDate, endDate } = selectedDates;
    const timings = selectedTimings;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysPerWeek = 7;
    const weekData = [];

    if (!selectedDates.startDate || !selectedDates.endDate || !selectedTimings) {
      setWeekData([]);
      return;
    }

    if (!timings || !startDate || !endDate) {
      return;
    }

    let currentDay = new Date(start);

    while (currentDay <= end) {
      // const weekStartDate = new Date(currentDay);

      // Find the nearest Sunday from the current start date
      const weekEndDate = new Date(currentDay);
      weekEndDate.setDate(weekEndDate.getDate() + (daysPerWeek - weekEndDate.getDay()));

      const days = [];
      const total = {};
      timings.forEach((timing) => {
        total[timing] = 0;
      });

      while (currentDay <= weekEndDate && currentDay <= end) {
        const dayData = {
          day: currentDay.toLocaleString('en-US', { weekday: 'short' }),
          date: currentDay.getDate(),
          disabled: currentDay < start,
        };

        timings.forEach((timing) => {
          dayData[timing] = 0;
        });

        days.push(dayData);
        currentDay.setDate(currentDay.getDate() + 1);
      }

      if (days.length > 0) {
        weekData.push({ days, total });
      }
    }

    setWeekData(weekData);
  };

  useEffect(() => {
    generateWeekData();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps




  useEffect(() => {
    if (formData.weekData) {
      setWeekData(formData.weekData);
    }
  }, [formData.weekData]);


  const renderInputFields = (weekIndex, week) => {

    const calculateDayTotal = (dayIndex) => {
      let total = 0;
      selectedTimings.forEach((timing) => {
        total += parseFloat(week.days[dayIndex][timing] || 0);
      });
      return total.toFixed(2);
    };

    const calculateOverallTotal = () => {
      let total = 0;
      week.days.forEach((day, dayIndex) => {
        total += parseFloat(calculateDayTotal(dayIndex)) || 0;
      });
      return total.toFixed(2); // Ensure the total is displayed with 2 decimal places
    };


    return (
      <tbody>
        <tr>
          <td>Week {weekIndex + 1}</td>
          {week.days.map((day, dayIndex) => (
            <td key={`day-${dayIndex}`}>{`${day.day} ${day.date}`}</td>
          ))}
          <td>Total</td>
        </tr>
        {selectedTimings.map((timing) => (
          <tr key={timing}>
            <th>{timing}</th>
            {week.days.map((day, dayIndex) => (
              <td key={`input-${dayIndex}`}>
                <InputNumber
                  value={day[timing]}
                  disabled={day.disabled}
                  className='hours-inputtext'
                  onChange={(e) =>
                    handleInputChange(weekIndex, dayIndex, timing, e.value)
                  }
                  minFractionDigits={1}
                />

              </td>
            ))}
            <td>
              <InputNumber
                value={week.total[timing] || 0}
                disabled
                className='hours-inputtext'
                step={0.5}
                minFractionDigits={1}
              />
            </td>
          </tr>
        ))}
        <tr>
          <th>Overall Total</th>
          {week.days.map((day, dayIndex) => (
            <td key={`overall-total-${dayIndex}`}>
              <InputNumber className='hours-inputtext'
                value={calculateDayTotal(dayIndex)}
                minFractionDigits={1}
                disabled />
            </td>
          ))}
          <td>
            <InputNumber className='hours-inputtext'
              value={calculateOverallTotal(weekIndex)}
              minFractionDigits={1}
              disabled />
          </td>
        </tr>
      </tbody>
    );
  };

  const getShortMonth = (date) => {
    const options = { month: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const renderWeekHeader = (weekIndex, week) => {
    const weekStartDate = week.days[0].date;
    const weekEndDate = week.days[week.days.length - 1].date;
    const weekStartMonth = getShortMonth(new Date(selectedDates.startDate));
    // const weekEndMonth = getShortMonth(new Date(selectedDates.endDate));

    return (
      <div className='d-flex '>
        <h5>
          Week {weekIndex + 1}
        </h5>

        <p className='ms-3'> {weekStartMonth} {weekStartDate} - { } {weekEndDate}</p>
      </div>
    );
  };

  const calculateOverallTotal = (week) => {
    let total = 0;
    week.days.forEach((day) => {
      selectedTimings.forEach((timing) => {
        total += parseFloat(day[timing] || 0);
      });
    });
    return total.toFixed(2);
  };

  let timeCardItems = [];

  const handleNext = () => {
    setWeekData((prevWeekData) => {

      const calculatedTotal = prevWeekData.reduce((total, week) => {
        return total + parseFloat(calculateOverallTotal(week));
      }, 0);

      const tolerance = 0.01;

      if (Math.abs(calculatedTotal - totalHours) < tolerance) {
        prevWeekData.forEach((week) => {
          week.days.forEach((day) => {
            const itemDate = `${selectedDates.startDate.getMonth() + 1}-${day.date}-${selectedDates.startDate.getFullYear()}`;

            const timeCardItem = {
              date: itemDate
            };

            // Add hours for each task with their descriptions as keys
            selectedTimings.forEach((timing) => {
              // Use the task description as the key
              const taskDescription = timing.split(':')[1].trim(); // Extract the task description
              timeCardItem[taskDescription] = parseFloat(day[timing]) || 0;
            });
            timeCardItems.push(timeCardItem);

            if (isCheckboxChecked) {
              setFinish(false);
            } else {
              setFinish(true);
            }

          });
        });
        setCurrentStep(currentStep + 1);
        console.log("Hours", timeCardItems);
      } else {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: `Total hours do not match expected value ${totalHours} entered value ${calculatedTotal}`,
          sticky: true
        });
      }

      return prevWeekData; // Return the updated week data to setWeekData
    });
  };

  useEffect(() => {
    dispatch(hoursStepValidationFunction(handleNext));
  }, [dispatch]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className=''>
        <div className=" mb-2 mt-3 row  p-fluid g-2 g-lg-3 align-items-center justify-content-center g-4">
          <div className="col">
            <Widget
              title="Total Days"
              value={totalDays}
            />
          </div>

          <div className="col">
            <Widget
              title="Total Hours"
              value={totalHours}
            />
          </div>
        </div>
        {weekData.length > 0 ? (
          weekData.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`}>
              {renderWeekHeader(weekIndex, week)}
              <hr />
              <div className="table-container">
                <Table className="p-mb-3">
                  {renderInputFields(weekIndex, week)}
                </Table>
              </div>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
        <Toast ref={toast} position="top-right" />
      </div>
      <div className='formgroup-inline mb-6'>
        <div className='field-checkbox'>
          <input type='checkbox' id="expenses" className='cursor-pointer  custom-checkbox'
            onClick={handleCheckboxClick}
            checked={isCheckboxChecked}
            readOnly
          />
          <label for="expenses" className='fw-bold cursor-pointer company-primary-text'>Have any expenses to add? </label>
        </div>
      </div>
    </>
  );
}

export default EmployeeHoursStep;
