import { Button } from "primereact/button";
const Deposit = () => (
    <div>
      <Button
        text
        label="Direct Deposit"
        size="small"
      />
    </div>
  )
const payrollDetailColumnConfig = [
    {
        field : "name",
        header : "First Name",
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field : "workeType",
        header : "Work Type",
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field : "hours",
        header : "Hours",
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field : "bonus",
        header : "Bonus",
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field : "grosspay",
        header : "Gross Pay",
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field : "deduction",
        header : "Deductions",
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field : "netPay",
        header : "Net Pay",
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field : "paymentType",
        header : "Payment Type",
         isSelected: true,
        isChecked: true,
        isPermanent: false,
        body:Deposit
    },
]

export default payrollDetailColumnConfig;