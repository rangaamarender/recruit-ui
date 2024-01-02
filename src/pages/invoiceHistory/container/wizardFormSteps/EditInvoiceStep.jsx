import React, { useMemo, useState } from "react";
import CustomInputText from "../../../../components/controls/CustomInputText";
import CustomDropdown from "../../../../components/controls/CustomDropdown";
import CustomInputMask from "../../../../components/controls/CustomInputMask";
import CustomInputPhoneNbr from "../../../../components/controls/CustomInputPhoneNbr";
import CustomCalender from "../../../../components/controls/CustomCalender";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CustomInputTextArea from "../../../../components/controls/CustomInputTextArea";
import CustomDomainInput from "../../../../components/controls/CustomDomainInput";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import InvoiceSuccessMessage from "./InvoiceSuccessMessage";

const EditInvoiceStep = ({ handleScroll }) => {
  const { control, formState: { errors }, reset } = useForm();

  const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
  ];

  const dataTableColumns = [
    { field: "sno", header: "#" },
    { field: "workername", header: "Worker Name" },
    { field: "description", header: "Description" },
    { field: "antHrs", header: "Ant. Hrs" },
    { field: "actHrs", header: "Act. Hrs" },
    { field: "billRate", header: "Bill Rate" },
    { field: "amount", header: "Amount" },
  ];

  const [dataTableData, setDataTableData] = useState([
    {
      id: 1,
      sno: 1,
      workername: "John Doe",
      description: "Task 1",
      antHrs: 10,
      actHrs: 10,
      billRate: 50,
    },
    {
      id: 2,
      sno: 2,
      workername: "Jane Smith",
      description: "Task 2",
      antHrs: 20,
      actHrs: 20,
      billRate: 50,
    },
  ]);

  const calculateAmount = (rowData) => {
    // Calculate amount (antHrs * billRate)
    return rowData.actHrs * rowData.billRate;
  };

  const deleteRow = (id) => {
    // Remove the row from DataTable based on its "id"
    const updatedData = dataTableData.filter((row) => row.id !== id);
    setDataTableData(updatedData);
  };

  const addRow = () => {
    const newRow = {
      sno: dataTableData.length + 1,
      workername: "",
      description: "",
      antHrs: 0,
      actHrs: 0,
      billRate: 0,
    };
    setDataTableData([...dataTableData, newRow]);
  };

  const handleRowDataChange = (rowData, field, value) => {
    const updatedData = [...dataTableData];
    const rowIndex = updatedData.indexOf(rowData);
    if (rowIndex !== -1) {
      updatedData[rowIndex][field] = value;
      setDataTableData(updatedData);
    }
  };

  const calculateSubTotal = () => {
    return dataTableData.reduce((total, rowData) => total + calculateAmount(rowData), 0);
  };

  const calculateTax = () => {
    const subTotal = calculateSubTotal();
    return subTotal * 0.1; // 10% tax
  };

  const calculateDiscount = () => {
    const subTotal = calculateSubTotal();
    return subTotal * 0.1; // 10% discount
  };

  const calculateTotalAmount = () => {
    const subTotal = calculateSubTotal();
    const tax = calculateTax();
    const discount = calculateDiscount();
    return subTotal + tax - discount;
  };

  // Use the useMemo hook to calculate these values only when the data changes
  const subTotal = useMemo(calculateSubTotal, [dataTableData]);
  const tax = useMemo(calculateTax, [dataTableData]); // eslint-disable-line react-hooks/exhaustive-deps
  const discount = useMemo(calculateDiscount, [dataTableData]); // eslint-disable-line react-hooks/exhaustive-deps
  const totalAmount = useMemo(calculateTotalAmount, [dataTableData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClearForm = () => {
    reset();
  };

  const handleCreateInvoice = () => {
    // Log the data object to the console
    console.log({
      dataTableData,
      subTotal,
      tax,
      discount,
      totalAmount,
    });

    // Set the flag to true after successful creation
    setIsInvoiceCreated(true);
  }

  const [isInvoiceCreated, setIsInvoiceCreated] = useState(false);

  const handleViewInvoice = () => {
    // Add logic to navigate to the invoice view page
    console.log("View Invoice clicked");
  };

  const handleSendInvoice = () => {
    // Add logic to send the invoice
    console.log("Send Invoice clicked");
  };
  const handleDownloadInvoice = () => {
    // Add logic to send the invoice
    console.log("Download Invoice clicked");
  };


  return (
    <>
      {isInvoiceCreated ? (
        <InvoiceSuccessMessage
          onViewInvoice={handleViewInvoice}
          onSendInvoice={handleSendInvoice}
          onDownloadInvoice={handleDownloadInvoice}
        />
      ) : (

        <div className="fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2" onScroll={handleScroll}>
          <h5 className="ms-4 text-center">Invoice</h5>
          <div class="formgrid grid mb-6 m-2">
            <div class=" col-12 md:col-6">
              <CustomDropdown
                control={control}
                errors={errors}
                name="employeeName"
                labelId="employeeName.label"
                defaultValue=""
                options={options}
                required={false}
                requiredMsg="employeeName.required"
                placeholder="Select employee name"
                autoFocus
              />
            </div>
            <div class="col-12 md:col-6">
              <CustomInputTextArea
                control={control}
                errors={errors}
                name="address"
                labelId="Address.label"
                defaultValue=""
                row={1}
                cols='auto'
                required={false}
                requiredMsg="address.required"
                placeholder="Company Address"
              />
            </div>
            <div class=" col-12 md:col-6">
              <CustomDropdown
                control={control}
                errors={errors}
                name="client"
                labelId="client.label"
                defaultValue=""
                options={options}
                required={false}
                requiredMsg="client.required"
                placeholder="Select client"
              />
            </div>
            <div class="col-12 md:col-6">
              <CustomInputText
                control={control}
                errors={errors}
                name="postalCode"
                labelId="postalCode.label"
                defaultValue=""
                required={false}
                type="number"
                requiredMsg="postalCode.required"
              />
            </div>
            <div class=" col-12 md:col-6">
              <CustomDropdown
                control={control}
                errors={errors}
                name="workOrder"
                labelId="workOrder.label"
                defaultValue=""
                options={options}
                required={false}
                requiredMsg="workOrder.required"
                placeholder="Select work order"
              />
            </div>
            <div className="col-12 md:col-6">
              <CustomInputText
                control={control}
                errors={errors}
                name="email"
                labelId="email.label"
                placeholder="admin@example.com"
                defaultValue=""
              />
            </div>
            <div class="col-12 md:col-6">
              <CustomCalender
                control={control}
                errors={errors}
                name="startDate"
                labelId="startDate.label"
                requiredMsg="startDate.required"
                defaultValue=""
                placeholder="MM/DD/YYYY"
                showIcon={true}
                required={false}
              />
            </div>
            <div class="col-12 md:col-6">
              <CustomDomainInput
                control={control}
                errors={errors}
                name="website"
                labelId="website.label"
                // value={newDomain}
                // onChange={handleDomainInputChange}
                // onKeyPress={handleDomainInputKeyPress}
                placeholder="http://www.example.com"
                required={false}
                defaultValue=""
                requiredMsg="website.required"
              />
            </div>
            <div class="col-12 md:col-6">
              <CustomInputPhoneNbr
                control={control}
                errors={errors}
                name="contactNumber"
                labelId="contactNumber.label"
                maskFormat="(999) 999-9999"
                defaultValue=""
                required={false}
                requiredMsg="contactNumber.required"
              />
            </div>

            <div class="col-12  border-secondary border-top-1 pt-3">
              <h5>Billing Address</h5>
            </div>
            <div class="col-12 md:col-6">
              <CustomInputText
                control={control}
                errors={errors}
                name="fullname"
                labelId="fullname.label"
                defaultValue=""
                required={false}
                requiredMsg="fullname.required"
              />
            </div>
            <div class=" col-12 md:col-6">
              <CustomInputMask
                control={control}
                errors={errors}
                name="taxNumber"
                labelId="taxNumber.label"
                mask="99-9999999"
                defaultValue=""
                required={false}
                requiredMsg="taxNumber.required"
              />
            </div>
            <div className="col-12 md:col-6">
              <CustomInputText
                control={control}
                errors={errors}
                name="email"
                labelId="email.label"
                placeholder="admin@example.com"
                defaultValue=""
              />
            </div>
            <div class="col-12 md:col-6">
              <CustomInputPhoneNbr
                control={control}
                errors={errors}
                name="phone"
                labelId="phone.label"
                maskFormat="(999) 999-9999"
                defaultValue=""
                required={false}
                requiredMsg="phone.required"
              />
            </div>
            <div class="col-12">
              <CustomInputTextArea
                control={control}
                errors={errors}
                name="address"
                labelId="Address.label"
                defaultValue=""
                row={2}
                cols='auto'
                required={false}
                requiredMsg="Address.required"
                placeholder="Company Address"
                className=""
              />
            </div>

            {/* DataTable */}
            <div className="col-12 mb-4">
              <DataTable value={dataTableData} editable={true}>
                {dataTableColumns.map((column, index) => (
                  <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    editor={(props) => {
                      if (column.field === "sno") {
                        return null;
                      } else if (column.field === "amount" || column.field === "antHrs" || column.field === "actHrs" || column.field === "billRate") {
                        return (
                          <InputText
                            type="number"
                            step="0.01"
                            value={props.rowData[column.field]}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^(\d+(\.\d{0,2})?)?$/.test(value)) {
                                handleRowDataChange(props.rowData, column.field, parseFloat(value) || 0);
                              }
                            }}
                            readOnly={column.field === "amount"}
                          />
                        );
                      } else {
                        return (
                          <InputText
                            type="text"
                            value={props.rowData[column.field]}
                            onChange={(e) => handleRowDataChange(props.rowData, column.field, e.target.value)}
                          />
                        );
                      }
                    }}
                    body={(rowData) => {
                      if (column.field === "amount") {
                        // return parseFloat(rowData["antHrs"] * rowData["billRate"]).toFixed(2); 
                        return calculateAmount(rowData).toFixed(2);
                      } else {
                        return rowData[column.field];
                      }
                    }}
                  />
                ))}
                <Column
                  header="Actions"
                  body={(rowData, rowIndex) => {
                    return (
                      <>
                        <i className="pi pi-trash cursor-pointer" onClick={() => deleteRow(rowData.id)} />
                      </>
                    );
                  }}
                />
              </DataTable>

            </div>
            <div className="col-12 mb-4">
              <Button type="button" size="small" icon="pi pi-plus" label="Add Item" onClick={addRow} />
            </div>

            {/* Display subtotals and total amount */}
            <div className="col-12 mb-4">
              <div className="d-flex justify-content-end gap-5 align-items-center border-top-1 border-secondary pt-2 pb-2">
                <div>
                  <span>Sub Total:</span>
                </div>
                <div>
                  <span>${subTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-5 align-items-center">
                <div>
                  <span className="me-2">Estimated Tax (10%):</span>
                </div>
                <div>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-5 align-items-center">
                <div>
                  <span className="me-2">Discount (10%):</span>
                </div>
                <div>
                  <span>${discount.toFixed(2)}</span>
                </div>
              </div>
              <div className="d-flex fw-bold justify-content-end gap-4 align-items-center mt-3 pt-2 pb-2 border-top-1 border-secondary border-bottom-1">
                <div>
                  <span className="me-1">Total Amount:</span>
                </div>
                <div>
                  <span className="">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div class="col-12 mt-2">
              <h5>Payment Details</h5>
            </div>
            <div class=" col-12 md:col-6">
              <CustomDropdown
                control={control}
                errors={errors}
                name="paymentMethod"
                labelId="paymentMethod.label"
                defaultValue=""
                options={options}
                required={false}
                requiredMsg="paymentMethod.required"
                placeholder="Select paymentMethod"
              />
            </div>
            <div class="col-12 md:col-6">
              <CustomInputText
                control={control}
                errors={errors}
                name="cardHoldername"
                labelId="cardHoldername.label"
                placeholder="Card Holder Name"
                defaultValue=""
                required={false}
                requiredMsg="cardHoldername.required"
              />
            </div>
            <div class=" col-12 md:col-6">
              <CustomDropdown
                control={control}
                errors={errors}
                name="selectCard"
                labelId="selectCard.label"
                defaultValue=""
                options={options}
                required={false}
                requiredMsg="selectCard.required"
                placeholder="XXXX XXXX XXXX"
              />
            </div>
            <div class="col-12 md:col-6 mb-6">
              <CustomInputText
                control={control}
                errors={errors}
                name="amount"
                labelId="amount.label"
                type='number'
                placeholder="$5,500.00"
                defaultValue=""
                required={false}
                requiredMsg="fullname.required"
              />
            </div>

            <div className='p-sidebar-header col-12 h-custom-10 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3 gap-3'>
              <Button type="button" severity='secondary' label='Clear' size='small' className="" onClick={handleClearForm} />
              <Button type="submit" severity='' label='Update Invoice' size='small' className="me-2" onClick={handleCreateInvoice} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditInvoiceStep;
