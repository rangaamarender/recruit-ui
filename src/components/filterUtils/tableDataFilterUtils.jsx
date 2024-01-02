import { FilterOperator, FilterMatchMode } from 'primereact/api';

export const initFilters = (columns) => {
    const initialFilters = {};
    columns.forEach((column) => {
        if (column.field === 'ceoPhone') {
            initialFilters[column.field] = {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.IN }],
            };
        } else
            initialFilters[column.field] = {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            };
    });

    return initialFilters;
};
