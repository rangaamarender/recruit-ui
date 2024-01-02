import { Button } from 'primereact/button';
import React from 'react';

const CustomModalHeader = ({ title, onClick }) => {
    return (
        <>
            <div className="flex  justify-content-between align-items-center">
                <div>{title}</div>
                <Button icon="pi pi-times" rounded onClick={onClick} style={{ width: '30px', height: '30px' }} />
            </div>
        </>
    );
};

export default CustomModalHeader;
