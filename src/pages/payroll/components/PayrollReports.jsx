import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import CustomDropdown from '../../../components/controls/CustomDropdown';

export default function PayrollReports() {
    const months = [
        { label: 'January', value: 0 },
        { label: 'February', value: 1 },
        { label: 'March', value: 2 },
        { label: 'April', value: 3 },
        { label: 'May', value: 4 },
        { label: 'June', value: 5 },
        { label: 'July', value: 6 },
        { label: 'August', value: 7 },
        { label: 'September', value: 8 },
        { label: 'October', value: 9 },
        { label: 'November', value: 10 },
        { label: 'December', value: 11 },
    ];

    const years = [
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
        // Add more years as needed
    ];
    const payPeriod = [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Weekly', value: 'weekly' },
        // Add more years as needed
    ];

    let required = false;
    const {
        control,
        formState: { errors },
    } = useForm();
    const [sales] = useState([
        {
            empName: 'Abhishek Pulluri',
            empId: 'AP456',
            department: 'DEV',
            workType: 'Billable',
            baseSalary: 417,
            overTimePay: 370,
            bonus: 150,
            advance: 0,
            allowances: 0,
            otherEarnings: 0,
            healthInsurancePrem: '--',
            retirementContribution: 2000,
            otherBenefits: 623,
            loanRepayment: 120,
            federalIncomeTax: '--',
            stateIncomeTax: '--',
            loanIncomeTax: '--',
            social: '--',
            totalEarnings: 2423,
            totalDeductions: 1000,
            totalTaxes: 223,
            netPay: 3000,
            vacation: '8hrs',
            sickLeave: '0hrs',
            personalDaysTaken: '3 Days',
            paidTimeOff: '--',
            unPaidLeave: '--',
            totalHoursLeave: '8hrs',
            employerSharesofSocialSecurityTax: '--',
            employerShareofMedicareTax: '--',
            federalUnemploymentTax: '--',
            stateUnemploymentTax: '--',
            workerCompensationPremium: '--',
            totalEarn: '--',
            employerTaxeContribution: '--',
            totalBenefitsCost: '--',
            totalCompensationCost: '--',
            ytdEarning: '--',
            ytdDeduction: '--',
            ytdTaxes: '--',
            ytdNet: '--',
        },
    ]);

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="Employee Information" colSpan={4} />
                <Column header="Earnings" colSpan={6} />
                <Column header="Deductions" colSpan={4} />
                <Column header="Taxes" colSpan={4} />
                <Column header="Net Pay" colSpan={4} />
                <Column header="Time Off" colSpan={6} />
                <Column header="Employers Taxes and Contribution" colSpan={5} />
                <Column header="Cost to Company" colSpan={4} />
                <Column header="YTD (Year-to-Date) Total" colSpan={4} />
            </Row>
            <Row>
                <Column header="Employee Name" field="EmpName" />
                <Column header="Employee Id" field="EmpId" />
                <Column header="Department" field="Department" />
                <Column header="Work Type" field="WorkType" />
                <Column header="Base Salary/Wages" field="baseSalary" />
                <Column header="Overtime Pay" field="overTimePay" />
                <Column header="Bonus" field="bonus" />
                <Column header="Advances" field="advances" />
                <Column header="Allowances" field="allowances" />
                <Column header="Other Earnings" field="otherEarnings" />
                <Column header="Health Insurance premiums" field="healthInsurancePrem" />
                <Column header="Retirment Contributions" field="retirementContribution" />
                <Column header="Other Benefits" field="otherBenefits" />
                <Column header="Laon Repayment" field="loanRepayment" />
                <Column header="Federal Income Tax" field="federalIncomeTax" />
                <Column header="State Income Tax" field="stateIncomeTax" />
                <Column header="Local Income Tax" field="loanIncomeTax" />
                <Column header="Social" field="social" />
                <Column header="Total Earnings" field="totalEarnings" />
                <Column header="Total Deductions" field="totalDeductions" />
                <Column header="Total Taxes" field="totalTaxes" />
                <Column header="Net Pay" field="netPay" />
                <Column header="Vacation" field="vacation" />
                <Column header="Sick Leave" field="sickLeave" />
                <Column header="personal Days Taken" field="personalDaysTaken" />
                <Column header="Paid Time off(PTO)" field="paidTimeOff" />
                <Column header="Unpaid Leave" field="unPaidLeave" />
                <Column header="Total Hours of Leave" field="totalHoursLeave" />
                <Column header="Employers shares of Social Security Tax" field="employerSharesofSocialSecurityTax" />
                <Column header="Employes Shares of Social Medical Tax" field="employerShareofMedicareTax" />
                <Column header="Federal Unemployement tax(FUTA)" field="federalUnemploymentTax" />
                <Column header="State Unemployement Tax(SUTA)" field="stateUnemploymentTax" />
                <Column header="Worker Compensation Premiums" field="workerCompensationPremium" />
                <Column header="Total Earnings" field="totalEarn" />
                <Column header="Employers Taxes and Contributions" field="employerTaxeContribution" />
                <Column header="Total Benefits Cost" field="totalBenefitsCost" />
                <Column header="Total Compensation Cost" field="totalCompensationCost" />
                <Column header="YTD Earnings" field="ytdEarning" />
                <Column header="YTD Deductions" field="ytdDeduction" />
                <Column header="YTD Taxes" field="ytdTaxes" />
                <Column header="YTD Net" field="ytdNet" />
            </Row>
        </ColumnGroup>
    );

    return (
        <>
            <div>
                <div className="flex-wrap p-fluid flex gap-4">
                    <div className="md:col-2 sm:col-12">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="period"
                            labelId="Period"
                            defaultValue=""
                            options={payPeriod}
                            required={required}
                            placeholder="Select Period"
                        />
                    </div>
                    <div className="md:col-2  sm:col-12">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="year"
                            labelId="Year"
                            defaultValue=""
                            options={years}
                            required={required}
                            placeholder="Select Year"
                        />
                    </div>
                    <div className="md:col-2  sm:col-12">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="month"
                            labelId="Month"
                            defaultValue=""
                            options={months}
                            required={required}
                            placeholder="Select Month"
                        />
                    </div>
                    <div className="mt-5">
                        <Button label="Apply" size="small" />
                    </div>
                </div>
            </div>
            <div>
                <DataTable value={sales} headerColumnGroup={headerGroup} size="small">
                    <Column field="empName" />
                    <Column field="empId" />
                    <Column field="department" />
                    <Column field="workType" />
                    <Column field="baseSalary" />
                    <Column field="overTimePay" />
                    <Column field="bonus" />
                    <Column field="advance" />
                    <Column field="allowances" />
                    <Column field="otherEarnings" />
                    <Column field="healthInsurancePrem" />
                    <Column field="retirementContribution" />
                    <Column field="otherBenefits" />
                    <Column field="loanRepayment" />
                    <Column field="federalIncomeTax" />
                    <Column field="stateIncomeTax" />
                    <Column field="loanIncomeTax" />
                    <Column field="social" />
                    <Column field="totalEarnings" />
                    <Column field="totalDeductions" />
                    <Column field="totalTaxes" />
                    <Column field="netPay" />
                    <Column field="vacation" />
                    <Column field="sickLeave" />
                    <Column field="personalDaysTaken" />
                    <Column field="paidTimeOff" />
                    <Column field="unPaidLeave" />
                    <Column field="totalHoursLeave" />
                    <Column field="employerSharesofSocialSecurityTax" />
                    <Column field="employerShareofMedicareTax" />
                    <Column field="federalUnemploymentTax" />
                    <Column field="stateUnemploymentTax" />
                    <Column field="workerCompensationPremium" />
                    <Column field="totalEarn" />
                    <Column field="employerTaxeContribution" />
                    <Column field="totalBenefitsCost" />
                    <Column field="totalCompensationCost" />
                    <Column field="ytdEarning" />
                    <Column field="ytdDeduction" />
                    <Column field="ytdTaxes" />
                    <Column field="ytdNet" />
                </DataTable>
            </div>
        </>
    );
}

// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { ColumnGroup } from 'primereact/columngroup';
// import { Row } from 'primereact/row';

// export default function PayrollReports() {
//   const [sales] = useState([
//     {
//         empName: 'Abhishek Pulluri',
//         empId: 'AP456',
//         department: 'DEV',
//         workType: 'Billable',
//         baseSalary: 417,
//         overTimePay: 370,
//         bonus: 150,
//         advance: 0,
//         allowances: 0,
//         otherEarnings: 0,
//         healthInsurancePrem: '--',
//         retirementContribution: 2000,
//         otherBenefits: 623,
//         loanRepayment: 120,
//         federalIncomeTax: '--',
//         stateIncomeTax: '--',
//         loanIncomeTax: '--',
//         social: '--',
//         totalEarnings: 2423,
//         totalDeductions: 1000,
//         totalTaxes: 223,
//         netPay: 3000,
//         vacation: '8hrs',
//         sickLeave: '0hrs',
//         personalDaysTaken: '3 Days',
//         paidTimeOff: '--',
//         unPaidLeave: '--',
//         totalHoursLeave: '8hrs',
//         employerSharesofSocialSecurityTax: '--',
//         employerShareofMedicareTax: '--',
//         federalUnemploymentTax: '--',
//         stateUnemploymentTax: '--',
//         workerCompensationPremium: '--',
//         totalEarn: '--',
//         employerTaxeContribution: '--',
//         totalBenefitsCost: '--',
//         totalCompensationCost: '--',
//         ytdEarning: '--',
//         ytdDeduction: '--',
//         ytdTaxes: '--',
//         ytdNet: '--',
//     },
// ]);

//   const headerGroup = (
//     <ColumnGroup>
//       <Row>
//         <Column header="Employee Information" colSpan={4}  />
//         <Column header="Earnings" colSpan={6} />
//         <Column header="Deductions" colSpan={4} />
//         <Column header="Taxes" colSpan={4} />
//         <Column header="Net Pay" colSpan={4} />
//         <Column header="Time Off" colSpan={6} />
//         <Column header="Employers Taxes and Contribution" colSpan={5} />
//         <Column header="Cost to Company" colSpan={4} />
//         <Column header="YTD (Year-to-Date) Total" colSpan={4} />
//       </Row>
//       <Row>
//         {[
//           'Emp Name', 'Emp Id', 'Department', 'Work Type',
//           'Base Salary', 'Overtime Pay', 'Bonus', 'Advances',
//           'Allowances', 'Other Earnings', 'Health Insurance',
//           'Retirement Contribution', 'Other Benefits', 'Loan Repayment',
//           'Federal Income Tax', 'State Income Tax', 'Local Income Tax',
//           'Social', 'Total Earnings', 'Total Deductions', 'Total Taxes',
//           'Net Pay', 'Vacation', 'Sick Leave', 'Personal Days Taken',
//           'Paid Time Off (PTO)', 'Unpaid Leave', 'Total Hours of Leave',
//           'Employer SS Tax', 'Employer Medicare Tax', 'FUTA', 'SUTA',
//           'Worker Comp. Premiums', 'Total Earnings', 'Employer Taxes',
//           'Total Benefits Cost', 'Total Comp. Cost', 'YTD Earnings',
//           'YTD Deductions', 'YTD Taxes', 'YTD Net',
//         ].map((header, index) => (
//           <Column key={index} header={header} field={header.toLowerCase()} />
//         ))}
//       </Row>
//     </ColumnGroup>
//   );

//   return (
//     <div className="">
//       <DataTable value={sales} headerColumnGroup={headerGroup} size="small" responsive>
//         {[
//           'empName', 'empId', 'department', 'workType',
//           'baseSalary', 'overTimePay', 'bonus', 'advance',
//           'allowances', 'otherEarnings', 'healthInsurancePrem',
//           'retirementContribution', 'otherBenefits', 'loanRepayment',
//           'federalIncomeTax', 'stateIncomeTax', 'loanIncomeTax', 'social',
//           'totalEarnings', 'totalDeductions', 'totalTaxes', 'netPay',
//           'vacation', 'sickLeave', 'personalDaysTaken', 'paidTimeOff',
//           'unPaidLeave', 'totalHoursLeave', 'employerSharesofSocialSecurityTax',
//           'employerShareofMedicareTax', 'federalUnemploymentTax', 'stateUnemploymentTax',
//           'workerCompensationPremium', 'totalEarn', 'employerTaxeContribution',
//           'totalBenefitsCost', 'totalCompensationCost', 'ytdEarning', 'ytdDeduction',
//           'ytdTaxes', 'ytdNet',
//         ].map((field, index) => (
//           <Column key={index} field={field} />
//         ))}
//       </DataTable>
//     </div>
//   );
// }
