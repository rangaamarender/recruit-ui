import React from 'react';

const ReOrderColumns = ({ value, index, columnConfig, setColumnConfig }) => {
    const Columns = columnConfig.filter((col) => col.isSelected);

    const reorderColumns = (fromIndex, toIndex) => {
        const reorderedColumns = [...Columns];
        const [removed] = reorderedColumns.splice(fromIndex, 1);
        reorderedColumns.splice(toIndex, 0, removed);
        setColumnConfig(reorderedColumns);
    };
    return (
        <>
            <i
                className="pi pi-bars"
                style={{ cursor: 'all-scroll' }}
                key={value}
                draggable={'true'}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={(e) => e.dataTransfer.setData('text', index)}
                onDrop={(e) => {
                    e.preventDefault();
                    const fromIndex = Number(e.dataTransfer.getData('text'));
                    const toIndex = index;
                    reorderColumns(fromIndex, toIndex);
                }}
            />
        </>
    );
};

export default ReOrderColumns;
