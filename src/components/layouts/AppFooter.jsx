import { CFooter } from '@coreui/react';
import React from 'react';

const AppFooter = () => {
    return (
        <CFooter>
            <div>
                <a href="https://www.lucidtechinc.com/" target="_blank" rel="noopener noreferrer" className='company-primary-text'>
                    Lucid Technologies
                </a>
                <span className="ms-1">&copy; 2023 </span>
            </div>
            <div className="ms-auto">
                <a className="text-muted small mx-3" href="#1" target="_blank" rel="noopener noreferrer">
                    Privacy
                </a>
                <a className="text-muted small mx-3" href="#2" target="_blank" rel="noopener noreferrer">
                    Security
                </a>
                <a className="text-muted small" href="#3" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                </a>
            </div>
        </CFooter>
    );
};

export default React.memo(AppFooter);
