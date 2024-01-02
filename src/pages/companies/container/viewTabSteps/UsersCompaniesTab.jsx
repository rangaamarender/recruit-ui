import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchResourceRequest, paginationhResourceRequest } from '../../../../redux/actions/resourceActions';
// import { useEffect } from 'react';
// import resourceColumnConfig from '../../../resources/config/resourceColumnConfig';
// import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UsersCompaniesTab = () => {

  // const dataTableRef = useRef();
  // const { resources, loading, error, allResources } = useSelector((state) => state.resource);
  const contracts = [
    {
      userName: "Austin Roy",
      userRole: 'Admin',
      email: 'austinroy@gmail.com',
      phone: '9999999999',
      createdOn: '10/08/2018',
      status: 'ACTIVE',
    },
    {
      userName: "Johnson",
      userRole: 'Admin',
      email: 'johnson@gmail.com',
      phone: '8888888888',
      createdOn: '10/08/2018',
      status: 'ACTIVE',
    },
   
  ]



  const optionsColumn = () => {
    return (
      <div>
        <i className="pi pi-ellipsis-v" />
      </div>
    );
  };

  return (
    <>
      <DataTable className='p-2' value={contracts} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        tableStyle={{ minWidth: '50rem' }} size="small">
        <Column field="userName" header="User Name"></Column>
        <Column field="userRole" header="Role"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="status" header="Status"></Column>
        <Column body={optionsColumn} ></Column>
      </DataTable>
    </>
  );
};

export default UsersCompaniesTab;





