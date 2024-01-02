import React, { useState } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import resourceActionMenu from '../config/resourceActionMenu';
import resourceColumnConfig from '../config/resourceColumnConfig';
import resourceSelectedColumns from '../config/resourceSelectedColumns';
import handleResourceAction from '../config/handleResourceAction';

const BenchResourcesListTab = () => {
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
                actionMenu={resourceActionMenu}
                columnsConfig={resourceColumnConfig}
                selectedColumns={resourceSelectedColumns}
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

export default BenchResourcesListTab;
