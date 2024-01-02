import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProductService } from './ProductService';

const Demo = () => {
    const [products, setProducts] = useState(null);
    const [demo, setDemo] = useState([]);

    useEffect(() => {
        ProductService.getProductsMini().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowEditComplete = (e) => {
        let _products = [...products];
        let { newData, index } = e;
        _products[index] = newData;

        setProducts(_products);
        setDemo('60')
        console.log(e,'ee');
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => {
                    options.editorCallback(e.target.value);
                    console.log(options.editorCallback);
                }}
                onClick={(e)=>console.log('e',options)}
                onBlur={onRowEditComplete}
            />
        );
    };

    const textEditor1 = (options) => {
        return (
            <InputText
                type="text"
                value={demo}
                disabled
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    const columns = [
        { field: 'mon', header: 'mon' },
        { field: 'tue', header: 'tue' },
        { field: 'wed', header: 'wed' },
        { field: 'thu', header: 'thu' },
        { field: 'fri', header: 'fri' },
        { field: 'sat', header: 'sat' },
        { field: 'sun', header: 'sun' },
    ];

    return (
        <div>
            <div className="card p-fluid">
                <DataTable
                    value={products}
                    editMode="row"
                    dataKey="id"
                    onRowEditComplete={onRowEditComplete}
                    onRowSelect={(e)=>console.log(e)}
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column field="regularTime" header="week1"></Column>
                    {columns.map((col, i) => (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            editor={(options) => textEditor(options)}
                        />
                    ))}
                    <Column field="sum" header="Total" editor={(options) => textEditor1(options)}></Column>
                    
                        <Column
                            rowEditor
                            headerStyle={{ width: '10%', minWidth: '8rem' }}
                            bodyStyle={{ textAlign: 'center' }}
                        ></Column>
                    
                </DataTable>
            </div>
        </div>
    );
};

export default Demo;
