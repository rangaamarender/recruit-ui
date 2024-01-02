import React, { useEffect } from 'react';
import PlainLayout from '../../../components/layouts/PlainLayout';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';

const EmployeeDashboardPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageName('Dashboard'));
    }, [dispatch]);

    return (
        <PlainLayout>
            <>
               <h1>Dashboard</h1>
            </>
        </PlainLayout>
    );
};

export default EmployeeDashboardPage;
