import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashboardPage from './eselfservice/pages/dashboard/EmployeeDashboardPage';
import EmployeeContractListPage from './eselfservice/pages/contracts/EmployeeContractListPage';
import EmployeeTimesheetListPage from './eselfservice/pages/timesheet/EmployeeTimesheetListPage';
import EmployeeExpensesListPage from './eselfservice/pages/expenses/EmployeeExpensesListPage';
import EmployeeImmigrationPage from './eselfservice/pages/immigration/EmployeeImmigrationPage';
import EmployeeDocumentsListPage from './eselfservice/pages/documents/EmployeeDocumentsListPage';
import EmployeeResumePage from './eselfservice/pages/resumes/EmployeeResumePage';
import EmployeeEmergencyContact from './eselfservice/pages/emergencyContact/EmployeeEmergencyContact';
import EmployeeDependentsPage from './eselfservice/pages/dependents/EmployeeDependentsPage';
import EmployeeProfilePage from './eselfservice/pages/profile/EmployeeProfilePage';
import AddEmployee from './eselfservice/pages/employeeRegistration/AddEmployee';
import { EmployeeSteps } from './eselfservice/pages/employeeRegistration/addEmployeeSteps';
import EmployeeBankInformation from './eselfservice/pages/bankInformation/EmployeeBankInformation';
import EmployeePayStubsListPage from './eselfservice/pages/payStubs/EmployeePayStubsListPage';
import EmployeePayroll from './eselfservice/pages/payroll/EmployeePayroll';

function EmployeeSelfSeviceRoutes() {
    return (
        <>
            <Routes>
                <Route
                    path="/recruit/employeeRegistration"
                    element={<AddEmployee title="Employee Registration" steps={EmployeeSteps} />}
                />
                <Route path="/recruit/employeeDashboard" element={<EmployeeDashboardPage />} />
                <Route path="/recruit/employeeContracts" element={<EmployeeContractListPage />} />
                <Route path="/recruit/employeeTimesheets" element={<EmployeeTimesheetListPage />} />
                <Route path="/recruit/employeeExpenses" element={<EmployeeExpensesListPage />} />
                <Route path="/recruit/employeePayStubs" element={<EmployeePayStubsListPage />} />
                <Route path="/recruit/employeePayroll" element={<EmployeePayroll />} />
                <Route path="/recruit/employeeImmigration" element={<EmployeeImmigrationPage />} />
                <Route path="/recruit/employeeBankDetails" element={<EmployeeBankInformation />} />
                <Route path="/recruit/employeeDocuments" element={<EmployeeDocumentsListPage />} />
                <Route path="/recruit/employeeResume" element={<EmployeeResumePage />} />
                <Route path="/recruit/employeeEmergencyContact" element={<EmployeeEmergencyContact />} />
                <Route path="/recruit/employeeDependents" element={<EmployeeDependentsPage />} />
                <Route path="/recruit/employeeProfile" element={<EmployeeProfilePage />} />
            </Routes>
        </>
    )
}

export default EmployeeSelfSeviceRoutes