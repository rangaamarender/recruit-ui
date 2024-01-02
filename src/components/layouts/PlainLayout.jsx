import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PlainLayout = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log(' layout --> Authenticated:' + isAuthenticated);
        if (!isAuthenticated) {
            navigate('/recruit/');
        }
    }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <AppSidebar />
            <div
                className='wrapper d-flex flex-column min-vh-100 '
            >
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    <CContainer fluid className="p-0">
                        {children}
                    </CContainer>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default PlainLayout;
