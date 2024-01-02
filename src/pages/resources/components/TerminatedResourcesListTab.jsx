import React, { useState } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import userColumnConfig from '../config/resourceColumnConfig';
import usersSelectedColumns from '../config/resourceSelectedColumns';
import usersActionMenu from '../config/resourceActionMenu';
import handleResourceAction from '../config/handleResourceAction';

const TerminatedResourcesListTab = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const data = [];
    const total = data.length;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    const handleRowSelect = (event) => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleRowUnselect = (e) => {
        setSidebarVisible(!sidebarVisible);
    };
    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    }

    return (
        <div>
            <CustomDataTable
                data={data}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={usersActionMenu}
                columnsConfig={userColumnConfig}
                selectedColumns={usersSelectedColumns}
                handleAction={handleResourceAction}
                rows={10}
                paginator
                first={first}
                last={last}
                totalRecords={total}
                currentPageReportTemplate={`{first} to {last} of ${total}`}
                onPage={onCustomPage}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </div>
    );
};

export default TerminatedResourcesListTab;
