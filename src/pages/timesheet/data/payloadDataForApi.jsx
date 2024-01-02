export const payloadDataForApi = (formData) => {


    const inputStartDate = new Date(formData.startDate);

    const startYear = inputStartDate.getFullYear();
    const startMonth = (inputStartDate.getMonth() + 1).toString().padStart(2, "0");
    const startDay = inputStartDate.getDate().toString().padStart(2, "0");
    
    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;

    const inputEndDate = new Date(formData.endDate);

    const endYear = inputEndDate.getFullYear();
    const endMonth = (inputEndDate.getMonth() + 1).toString().padStart(2, "0");
    const endDay = inputEndDate.getDate().toString().padStart(2, "0");

    const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;


    const transformedData = {

        worker: {
            workerID: formData.resource
        },
        contract: {
            contractID: "C01",
            workOrder: {
                workOrderID: formData.selectedWorkOrder.value,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                totalHours: formData.totalHours,
                timeCardItems: formData.timeCardItems,
                timeCardExpenses: [
                    {
                        expenseDate: "2023-01-04",
                        expenseCode: {
                            expenseCodeId: "EC01",
                            expenseCodeName: "ECName"
                        },
                        amount: {
                            amountValue: 15,
                            amountCurrency: "sl"
                        }
                    }
                ]
            }
        }
    }

    return transformedData;
};