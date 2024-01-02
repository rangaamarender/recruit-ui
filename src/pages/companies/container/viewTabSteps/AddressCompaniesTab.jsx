import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompaniesRequest, paginationhCompanyRequest } from '../../../../redux/actions/companiesActions';
import { Toast } from 'primereact/toast';
import handleCompanyAction from '../../config/handleCompanyAction';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import addressSelectedColumns from '../../config/addressSelectedColumns';
import addressColumnConfig from '../../config/addressColumnConfig';
// import { addressData } from '../../../companies/config/addressData';
import addressActionMenu from '../../config/addressActionMenu';
import { Button } from 'primereact/button';
import EditAddressDetails from './EditAddressDetails';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import AddNewAddressDetails from './AddNewAddressDetails';

const AddressCompaniesTab = ({ columnConfig, handleFilterClick, dataTableRef }) => {

  const [addSidebarVisible, setAddSidebarVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [viewSidebarVisible, setViewSidebarVisible] = useState(false);
  // console.log(setSelectedRowData);

  const dispatch = useDispatch();
  const toast = useRef(null);

  // const [sidebarVisible, setSidebarVisible] = useState(false);
  const { loading, error, selectedCompany } = useSelector((state) => state.company);
  const orgAddresses = selectedCompany ? selectedCompany.orgAddresses : "No Address Available";

  // console.log("addressData11", orgAddresses);

  const total = orgAddresses ? orgAddresses.length : 0;
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(total);

  useEffect(() => {
    dispatch(paginationhCompanyRequest());
    dispatch(fetchCompaniesRequest());
  }, [dispatch]);

  const handleRowSelect = (selectedRow) => {
    // dispatch(fetchCompanyRequest(selectedRow.data.organizationID));
    setSelectedRowData(selectedRow.data)
    console.log("selectedRow", selectedRow.data);
    setViewSidebarVisible(true);
  };

  const handleRowUnselect = () => {
    setViewSidebarVisible(false);
  };

  const addAddressActionHandler = () => {
    setAddSidebarVisible(true);
  };

  // const closeEarningsDeductionsActionHandler = () => {
  //   setAddSidebarVisible(false);
  // };

  const toggleSidebar = () => {
    setViewSidebarVisible(!viewSidebarVisible);
    // dispatch(handleActions(''));
  };

  const handleOnHide = () => {
    setAddSidebarVisible(false);
  };

  const onCustomPage = (event) => {
    setFirst(event.first);
    setLast(event.last);
  };

  useEffect(() => {
    if (loading) {
      // toast.current.show({ severity: 'info', summary: 'Loading', detail: 'Please wait Loading...' });
      return;
    }

    if (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `${error}`, sticky: false });
    }

    if (!selectedCompany) {
      toast.current.show({ severity: 'warn', summary: 'Error', life: '500', detail: 'No data available. Wait Data Loading...' });
    }
  }, [loading, selectedCompany, error]);

  return (
    <>
      <div className='m-3'>
        <Toast ref={toast} />
        <>
          <Viewer
            visible={addSidebarVisible}
            onHide={handleOnHide}
            header={
              <TitleHeaderOnly
                onClick={handleOnHide}
                title={"Add New Address"}
              />
            }
            contentComponent={<AddNewAddressDetails setAddSidebarVisible={setAddSidebarVisible} />}
          />

          <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
            <h5>Address List</h5>
            <Button
              label=""
              severity="primary"
              icon="pi pi-plus fs-5"
              onClick={addAddressActionHandler}
              size="small"
            />
          </div>
        </>

        <Viewer
          visible={viewSidebarVisible}
          onHide={toggleSidebar}
          header={
            <TitleHeaderOnly
              onClick={toggleSidebar}
              title={"Edit Address"}
            />
          }
          contentComponent={<EditAddressDetails selectedRowData={selectedRowData} setViewSidebarVisible={setViewSidebarVisible} />}
        />

        {orgAddresses && orgAddresses.length > 0 ? (
          <CustomDataTable
            data={orgAddresses}
            onRowSelect={handleRowSelect}
            onRowUnselect={handleRowUnselect}
            actionMenu={addressActionMenu}
            columnsConfig={addressColumnConfig}
            selectedColumns={addressSelectedColumns}
            handleAction={handleCompanyAction}
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
            dataTableRef={dataTableRef}
            rows={10}
            paginator
            first={first}
            last={last}
            totalRecords={total}
            currentPageReportTemplate={`{first} to {last} of ${total}`}
            onPage={onCustomPage}
            rowsPerPageOptions={[10, 25, 50]}
            sortable
          />
        ) : (
          <h5 className='m-2'>No Address available...</h5>
        )}
      </div>
    </>
  );
};

export default AddressCompaniesTab;
