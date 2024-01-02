import React from 'react';
import { Paginator } from 'primereact/paginator';
const CustomPagination = ({ first, rows, totalRecords, onPageChange }) => {
    return (
        <Paginator
            first={first}
            rows={rows}
            rowsPerPageOptions={[10, 20, 30]}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
            template={{ layout: "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" }}
        />
    );
};
export default CustomPagination;