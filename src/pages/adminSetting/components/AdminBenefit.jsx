import React from 'react';
import AdminReusableComp from './AdminReusableComp';

const AdminBenefit = () => {
  const options = [
    { label: 'Employee Benefits', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Select Plan', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  ];

  return (
    <div>
    <AdminReusableComp title='Benefits' options={options} />
    </div>
  )
};

export default AdminBenefit;