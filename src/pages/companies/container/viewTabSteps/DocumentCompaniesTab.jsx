import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchResourceRequest, paginationhResourceRequest } from '../../../../redux/actions/resourceActions';
// import { useEffect } from 'react';
// import resourceColumnConfig from '../../../resources/config/resourceColumnConfig';
// import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const DocumentCompaniesTab = () => {

  // const dataTableRef = useRef();
  // const { resources, loading, error, allResources } = useSelector((state) => state.resource);
  const contracts = [
    {
      resourceTitle: "LCA-lucidtech",
      resourceID: 'R-AB009',
      DocNumber: '3119766101',
      uploadDate: '10/08/2018',
      expDate: '18/08/2020',
    },
    {
      resourceTitle: "Tata Consultant",
      resourceID: 'R-AB008',
      DocNumber: '3119766102',
      uploadDate: '10/08/2018',
      expDate: '18/08/2023',
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
        <Column field="resourceTitle" header="Resource Title"></Column>
        <Column field="resourceID" header="Resource ID"></Column>
        <Column field="DocNumber" header="Doc. Number"></Column>
        <Column field="uploadDate" header="Upload Date"></Column>
        <Column field="expDate" header="Expiry Date"></Column>
        <Column body={optionsColumn} ></Column>
      </DataTable>
    </>
  );
};

export default DocumentCompaniesTab;





