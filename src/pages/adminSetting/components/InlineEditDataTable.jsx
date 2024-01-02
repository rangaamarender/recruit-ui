import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const InlineEditDataTable = ({ data, columns, actionTemplate }) => {
  return (
    <div>
        <DataTable value={data} size="small" dataKey="id">
            {columns.map((column) => (
                <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    body={column.body}
                    style={{ width: column.width || 'auto' }}
                />
            ))}
            <Column
                body={actionTemplate}
                headerStyle={{ width: '10%', minWidth: '1rem' }}
                bodyStyle={{ textAlign: 'center' }}
            />
        </DataTable>
    </div>
  )
}

export default InlineEditDataTable