import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './global.css';
import './scss/style.scss';

//core
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import { I18nProvider } from './i18n/i18n';

import Widgets from './pages/DashBoard1/Widgets';
import AddressBookPage from './pages/addressBook/addressBookPage';
import ChatsPage from './pages/chats/ChatsPage';
import CompaniesListPage from './pages/companies/CompaniesListPage';
import ContractListPage from './pages/contracts/ContractListPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import EmsForgotPassword from './pages/ems/EmsForgotPassword';
import EmsLogin from './pages/ems/EmsLogin';
import EMSResetPassword from './pages/ems/EmsResetPassword';
import EmsSignUp from './pages/ems/EmsSignUp';
import EmsVerification from './pages/ems/EmsVerification';
import EmsRegister from './pages/ems/emsRegister/EmsRegister';
import PayrollListPage from './pages/payroll/PayrollListPage';
import ResourceListPage from './pages/resources/ResourceListPage';
import TimesheetListPage from './pages/timesheet/TimesheetListPage';
import Meeting from './pages/meetings/meeting';
import AdminSettingPage from './pages/adminSetting/AdminSettingPage';
import CreateInvoicesListPage from './pages/createInvoices/CreateInvoicesListPage';
import InvoiceHistoryListPage from './pages/invoiceHistory/InvoiceHistoryListPage';

import { ThemeProvider } from './components/ThemeProvider';
import NoAccess from './pages/statusCodes/403';
import NoPage from './pages/statusCodes/404';
import InvalidLink from './pages/statusCodes/InvalidLink';
import VerifySignup from './pages/ems/VerifySignup';
import EmployeeSelfSeviceRoutes from './EmployeeSelfSeviceRoutes';
import ContractListWoPage from './pages/contracts/ContractListWoPage';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchTenantColor } from './redux/actions/headerTitleActions';
import SupplierRoutes from './SupplierRoutes';

// import Keycloak from 'keycloak-js';
function App() {
    // const keycloak = new Keycloak({
    //     url: 'http://192.168.40.172:8081',
    //     realm: 'cy9realm',
    //     clientId: 'ravesreactclient',
    // });
    // const initOptions = { pkceMethod: 'S256', onLoad: 'login-required' };

    // const handleOnEvent = async (event, error) => {
    //     if (event === 'onAuthSuccess') {
    //         if (keycloak.authenticated) {
    //             console.log('done');
    //         }
    //     }
    // };
    const dispatch = useDispatch();
    const color = useSelector((state)=> state.headerTitle.setTenantColor)
    useEffect(()=>{
        dispatch(fetchTenantColor())
        document.documentElement.style.setProperty('--primary-color', color);
    })

    return (
        <ThemeProvider>
            <I18nProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/recruit/dashboard" element={<DashboardPage />} />
                        <Route path="/recruit/widgets" element={<Widgets />} />
                        <Route path="/recruit/addressBook" element={<AddressBookPage />} />
                        <Route path="/recruit/payroll" element={<PayrollListPage />} />
                        <Route path="/recruit/timesheets" element={<TimesheetListPage />} />
                        <Route path="/recruit/resources" element={<ResourceListPage />} />
                        <Route path="/recruit/contracts" element={<ContractListPage />} />
                        <Route path="/recruit/contractListWoPage" element={<ContractListWoPage />} />
                        <Route path="/recruit/companies" element={<CompaniesListPage />} />
                        <Route path="/recruit/" element={<EmsLogin />} />
                        <Route path="/recruit/signup" element={<EmsSignUp />} />
                        <Route path="/recruit/register" element={<EmsRegister />} />
                        <Route path="/recruit/forgotPassword" element={<EmsForgotPassword />} />
                        <Route path="/recruit/forgotPassword" element={<EmsForgotPassword />} />
                        <Route path="/recruit/verification" element={<EmsVerification />} />
                        <Route path="/recruit/verifySignup/*" element={<VerifySignup />} />
                        <Route path="/recruit/resetPassword" element={<EMSResetPassword />} />
                        <Route path="/recruit/chat" element={<ChatsPage />} />
                        <Route path="/recruit/createInvoices" element={<CreateInvoicesListPage />} />
                        <Route path="/recruit/invoiceHistory" element={<InvoiceHistoryListPage />} />
                        <Route path="/recruit/meetings" element={<Meeting />} />
                        <Route path="/recruit/adminsetting" element={<AdminSettingPage />} />

                        <Route path="/recruit/403" element={<NoAccess />} />
                        <Route path="/recruit/404" element={<NoPage />} />
                        <Route path="/recruit/invalid-link" element={<InvalidLink />} />
                        
                   </Routes>
                    <EmployeeSelfSeviceRoutes />
                    <SupplierRoutes/>
                </BrowserRouter>
            </I18nProvider>
        </ThemeProvider>
    );
}

export default App;
