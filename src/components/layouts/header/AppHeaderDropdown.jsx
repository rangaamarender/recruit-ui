import {
    cilBell,
    cilCommentSquare,
    cilCreditCard,
    cilEnvelopeLetter,
    cilFile,
    cilSettings,
    cilTask,
    cilUser,
    cilMoon,
    cilSun,
    cilExitToApp,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react';
import { Avatar } from 'primereact/avatar';
import React from 'react';
import { CFormSwitch } from '@coreui/react';
import { useTheme } from '../../ThemeProvider';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AppHeaderDropdown = () => {
    const { isDarkTheme, toggleTheme } = useTheme();
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const handleThemeToggleClick = (e) => {
        e.preventDefault();
        toggleTheme();
    };
    const selectedProfilePicture = useSelector((state) => state.headerTitle.selectedProfilePicture);
    return (
        <CDropdown variant="nav-item" dark={isDarkTheme} onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
            <CDropdownToggle
                placement="bottom-end"
                className="flex justify-content-center align-items-center gap-2"
                caret={false}
            >
                {/* Avatar */}
                <Avatar
                    image={selectedProfilePicture}
                    shape="circle"
                >
                    {!selectedProfilePicture && "J"}
                </Avatar>
                <i className="pi pi-angle-down" style={{ width: '8px' }}></i>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0 " placement="bottom-end" style={{ minWidth: '200px' }}>
                <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilBell} className="me-2" />
                    Updates
                    <CBadge color="info" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilEnvelopeLetter} className="me-2" />
                    Messages
                    <CBadge color="success" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilTask} className="me-2" />
                    Tasks
                    <CBadge color="danger" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilCommentSquare} className="me-2" />
                    Comments
                    <CBadge color="warning" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilSettings} className="me-2" />
                    Settings
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilCreditCard} className="me-2" />
                    Payments
                    <CBadge color="secondary" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilFile} className="me-2" />
                    Projects
                    <CBadge color="primary" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#" className="d-flex align-items-center" onClick={handleThemeToggleClick}>
                    <CIcon icon={isDarkTheme ? cilSun : cilMoon} className="me-2" />
                    {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                    <CFormSwitch id="formSwitchCheckDefault" className="ms-2 fs-5" checked={isDarkTheme} />
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="/recruit/">
                    <CIcon icon={cilExitToApp} className="me-2" />
                    Sign Out
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;
