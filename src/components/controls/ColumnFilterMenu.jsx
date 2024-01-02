import { Checkbox } from 'primereact/checkbox';

export const ColumnFilterMenu = ({ columns, onCheckboxClick, handleCheckboxChange, reorderColumns }) => [
    {
        label: <div className=" fs-5 fw-bold text-start mt-2">Edit Columns</div>,
    },
    {
        label: <div className=" fs-6  fw-bold  company-secondary-text">Fixed columns</div>,
        items: [
            {
                label: columns?.map((col, i) => {
                    if (col.isPermanent) {
                        return (
                            <div key={i} className=" company-main-text fw-normal" onClick={onCheckboxClick}>
                                {col.header}
                            </div>
                        );
                    }
                }),
            },
        ],
    },
    { separator: true },
    {
        label: (
            <div className="company-secondary-text text-start mt-2 lh-base fw-normal fs-6 fw-bold">Active columns</div>
        ),
        items: [
            {
                label: columns?.map((col, index) => {
                    if (col.isChecked) {
                        return (
                            <div
                                key={index}
                                className="cursorPointer menu-item m-2 company-main-text d-flex justify-content-between align-items-center"
                            >
                                <div
                                    onClick={onCheckboxClick}
                                    className="d-flex justify-content-start align-items-center g-4"
                                >
                                    <Checkbox
                                        inputId={col.field}
                                        key={index}
                                        value={col.field}
                                        name={col.field}
                                        onChange={(e) => handleCheckboxChange(e, col.field)}
                                        checked={col.isChecked}
                                    />
                                    <label className="company-main-text fw-normal" htmlFor={col.field}>
                                        {col.header}
                                    </label>
                                </div>
                                <i
                                    className="pi pi-bars"
                                    style={{ cursor: 'all-scroll' }}
                                    key={col.field}
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
                            </div>
                        );
                    }
                }),
            },
        ],
    },

    { separator: true },
    {
        label: (
            <div className="company-secondary-text text-start mt-2 lh-base fw-normal fs-6 fw-bold">Available Name</div>
        ),
        items: [
            {
                label: columns?.map((col, index) => {
                    if (!col.isChecked && !col.isPermanent) {
                        return (
                            <div
                                onClick={onCheckboxClick}
                                key={index}
                                className=" menu-item m-2 d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex justify-content-start align-items-center g-4">
                                    <Checkbox
                                        inputId={col.field}
                                        key={index}
                                        value={col.field}
                                        name={col.field}
                                        onChange={(e) => handleCheckboxChange(e, col.field)}
                                        checked={col.isChecked}
                                    />
                                    <label className="company-main-text fw-normal" htmlFor={col.field}>
                                        {col.header}
                                    </label>
                                </div>
                            </div>
                        );
                    }
                }),
            },
        ],
    },
];
