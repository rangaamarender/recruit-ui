import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import React from 'react';

function MainTableLoaderSkeleton({ columnConfig, numRows }) {
    const renderSkeletonBody = () => {
        return <Skeleton width="100%" height="1.5rem" />;
    };
    const calculateColumnWidth = () => {
        const totalColumns = columnConfig.filter((item) => item.isSelected).length;
        const calculatedWidth = 100 / totalColumns;
        return `${calculatedWidth}%`;
    };
    const renderSkeletonColumns = () => {
        return columnConfig
            .filter((item) => item.isSelected)
            .map((column) => (
                <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    body={renderSkeletonBody}
                    bodyStyle={{ width: calculateColumnWidth() }}
                />
            ));
    };
    const renderSkeletonRows = () => {
        return Array.from({ length: numRows }).map((_, rowIndex) => (
            <Skeleton key={rowIndex} width="100%">
                {columnConfig.map((column) => (
                    <td key={column.field} className="p-skeleton-text"></td>
                ))}
            </Skeleton>
        ));
    };
    return (
        <div>
            <DataTable
                stripedRows
                value={Array.from({ length: numRows })}
                size="small"
                tableStyle={{ border: 'none', marginBottom: '40px', width: '100%' }}
                tableClassName="borderless-table"
            >
                {renderSkeletonColumns()}
                {renderSkeletonRows()}
            </DataTable>
        </div>
    );
}

export default MainTableLoaderSkeleton;
