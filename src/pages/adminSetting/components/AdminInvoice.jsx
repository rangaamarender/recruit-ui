import React from 'react';
import AdminReusableComp from './AdminReusableComp';

const AdminInvoice = () => {
  const options = [
    { label: 'View Invoice', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Edit Invoice', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Change Status', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Delete', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Download Invoice', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Export Invoice', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  ];

  return (
    <div>
    <AdminReusableComp title='Invoices' options={options} />
    </div>
  )
};

export default AdminInvoice;