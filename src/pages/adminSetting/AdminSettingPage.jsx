import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import ToogleLayout from '../../components/layouts/toogleLayout';
import AdminMenuItem from './config/AdminSettingSidebar';

const AdminSettingPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentPageName('Admin Settings'));
    }, [dispatch]);

    return <ToogleLayout menuItems={AdminMenuItem} selectedItem="Company Settings" />;
};

export default AdminSettingPage;
