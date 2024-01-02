import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';

const PlainCustomDataTable = ({ data, selectedColumns, columnsConfig }) => {
    return (
        <div>
            <DataTable
                stripedRows
                size="small"
                value={data}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                selectionMode="single"
                emptyMessage="No records found"
            >
                {columnsConfig.map(
                    (col) =>
                        selectedColumns.includes(col.field) && (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={col.body || ((rowData) => rowData[col.field])}
                            />
                        )
                )}
            </DataTable>
        </div>
    );
};
export default PlainCustomDataTable;
