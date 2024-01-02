import React from 'react';

const PersonalTab = ({ isEditClick }) => {
    const renderInfoSection = (title, content) => (
        <div className="col-sm-12 col-md-6">
            <div className="p-text-secondary">{title}</div>
            <div className="p-text-primary">{content}</div>
        </div>
    );

    const renderVerificationStatus = (icon, text, color) => (
        <div className="col-sm-12 col-md-6">
            <div className="p-text-secondary">{text}</div>
            <div className="p-text-primary">
                <i className={`pi ${icon} pr-1`} style={{ color }}></i>
                <span className="">{text}</span>
            </div>
        </div>
    );

    return (
        <>
            <div className="p-3">
                <div className="fs-5 fw-bold border-bottom flex align-items-center justify-content-between">
                    <div>Personal Information</div>
                    <div>{isEditClick && <i className="pi pi-pencil p-text-primary"></i>}</div>
                </div>

                <div className="row gutter-1 mt-3">
                    {renderInfoSection('First Name', 'Austin Ray')}
                    {renderInfoSection('Last Name', 'Austin Ray')}
                </div>

                <div className="row gutter-1 mt-3">
                    {renderInfoSection('Role', 'Admin')}

                    {renderInfoSection('Email', 'austinray@gmail.com')}
                </div>

                <div className="row gutter-1 mt-3">
                    {renderInfoSection('Phone Number', '+1 201-000-4255')}

                    {renderVerificationStatus('pi-verified', 'Email Verified', 'green')}
                </div>
                <div className="row gutter-1 mt-3">{renderVerificationStatus('pi-ban', 'Phone Verified', 'red')}</div>
            </div>
        </>
    );
};

export default PersonalTab;
