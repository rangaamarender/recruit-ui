import React, { useEffect } from 'react';
import PlainLayout from '../../components/layouts/PlainLayout';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import EntityDashboardCounts from '../../components/dashboard/EntityDashboardCounts';
import dashBoardWizardCount from './config/dashBoardWizardCount';
import DashBoardGraphContainer from './container/DashBoardGraphContainer';
import DashBoardPendingEmployeeContainer from './container/DashBoardPendingEmployeeContainer';
import DashBoardEmployeeTable from './components/DashBoardEmployeeTable';

const DashboardPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageName('Dashboard'));
    }, [dispatch]);

    return (
        <PlainLayout>
            <div>
                <EntityDashboardCounts widgetList={dashBoardWizardCount} />
                <DashBoardGraphContainer />
                <DashBoardPendingEmployeeContainer />
                <DashBoardEmployeeTable />
            </div>
        </PlainLayout>
    );
};

export default DashboardPage;
