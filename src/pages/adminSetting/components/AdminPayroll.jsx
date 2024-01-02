import React from 'react';
import AdminReusableComp from './AdminReusableComp';

const AdminPayroll = () => {
  const options = [
    { label: 'Payroll Generation', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Run Payroll', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Preview Payslip', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Download Payslip', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Tax Info', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Bank Information', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Payroll Documents', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'History', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  ];

  return (
    <div>
    <AdminReusableComp title='Payroll' options={options} />
    </div>
  )
};

export default AdminPayroll;