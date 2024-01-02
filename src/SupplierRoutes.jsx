import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SupplierDashboardPage from './supplier/pages/dashboard/SupplierDashboardPage';
import SupplierContractsListPage from './supplier/pages/contracts/SupplierContractsListPage';
import SupplierCompliancePage from './supplier/pages/compliance/SupplierCompliancePage';
import SupplierResourcesListPage from './supplier/pages/resources/SupplierResourcesListPage';
import SupplierTimesheetsListPage from './supplier/pages/timesheets/SupplierTimesheetsListPage';
import SupplierProfilePage from './supplier/pages/generalProfile/SupplierProfilePage';
import SupplierUserManagementListPage from './supplier/pages/userManagement/SupplierUserManagementListPage';


function SupplierRoutes() {
    return (
        <>
            <Routes>
                <Route path="/recruit/supplierDashboard" element={<SupplierDashboardPage />} />
                <Route path="/recruit/supplierContracts" element={<SupplierContractsListPage />} />
                <Route path="/recruit/supplierCompliance" element={<SupplierCompliancePage />} />
                <Route path="/recruit/supplierResources" element={<SupplierResourcesListPage />} />
                <Route path="/recruit/supplierTimesheets" element={<SupplierTimesheetsListPage />} />
                <Route path="/recruit/supplierProfile" element={<SupplierProfilePage />} />
                <Route path="/recruit/supplierUserManagement" element={<SupplierUserManagementListPage />} />
                
            </Routes>
        </>
    )
}

export default SupplierRoutes