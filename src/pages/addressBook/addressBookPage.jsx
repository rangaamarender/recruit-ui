import React, { useEffect } from 'react';
import PlainLayout from '../../components/layouts/PlainLayout';
import TabMenuContainer from '../../components/tabmenu/TabMenuContainer';
import addressTabs from './config/addressTabs';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';

const AddressBookPage = () => {
    const dispatch = useDispatch();
    const sidebarStyle = {
        marginLeft: '-1.5vw',
        marginTop: '-1.2vh',
    };
    // const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        dispatch(setCurrentPageName('Address Book'));
    }, [dispatch]);

    // const addAddressBookActionHandler = () => {
    //     setSidebarVisible(true);
    // };
    const actionButtons = [
        {
            label: '',
            icon: 'pi pi-plus fw-normal fs-5',
        },
    ];
    return (
        <PlainLayout>
            <div style={sidebarStyle}>
                <TabMenuContainer tabItems={addressTabs} actionButtons={actionButtons} />
            </div>
        </PlainLayout>
    );
};

export default AddressBookPage;
