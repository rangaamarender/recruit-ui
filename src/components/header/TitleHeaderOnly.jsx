import React from 'react';
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css"; // Import the styles
import { Button } from 'primereact/button';
import './titleHeader.css';

const TitleHeaderOnly = ({ onClick, title,scrollPosition }) => {
    return (
        <>
            <div className={`custom-header  top-0  p-2 p-sidebar-header ${scrollPosition > 0 && "boxShadow"}`}>
                <div className="left ml-2 pt-2">
                    {/* Content on the left side */}
                    <h5 className="fw-bold">{title}</h5>
                </div>
                <div className="right">
                    <div className="d-flex  justify-content-center align-items-center gap-3">
                        <div className="customDivider"></div>
                        <Button
                            icon="pi pi-times"
                            rounded
                            onClick={onClick}
                            style={{ width: '30px', height: '30px' }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TitleHeaderOnly;
