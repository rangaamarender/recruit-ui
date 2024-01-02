import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'react-google-charts';
import { Card } from 'primereact/card';
import WidgetHeader from './WidgetHeader';

const SalesTable = () => {
    const [selectedCity, setSelectedCity] = useState('New York');
    const citiesDownOptions = [
        { label: 'New York', value: 'NY' },
        { label: 'Rome', value: 'RM' },
        { label: 'London', value: 'LDN' },
        { label: 'Istanbul', value: 'IST' },
        { label: 'Paris', value: 'PRS' },
    ];
    const data = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 40 },
    ];
    const geoData = [
        ['Country', 'Sales'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700],
    ];
    const onDropdownChange = (e) => {
        setSelectedCity(e.target.value);
    };
    return (
        <>
            <Card
                className="custom-card p-3 "
                header={
                    <WidgetHeader
                        heading="Payment Overview"
                        onDropdownChange={onDropdownChange}
                        dropdownValue={selectedCity}
                        dropDownOptions={citiesDownOptions}
                        placeholder="Weekly"
                        type="dropDown"
                    />
                }
            >
                <div className="table-and-graph-container">
                    <div className="table-container">
                        <DataTable value={data}  >
                            <Column field="name" header="Contract" />
                            <Column field="age" header="Earning" />
                        </DataTable>
                    </div>
                    <div className="graph-container">
                        <Chart
                            chartEvents={[
                                {
                                    eventName: 'select',
                                    callback: ({ chartWrapper }) => {
                                        const chart = chartWrapper.getChart();
                                        const selection = chart.getSelection();
                                        if (selection.length === 0) return;
                                        const region = data[selection[0].row + 1];
                                        console.log('Selected : ' + region);
                                    },
                                },
                            ]}
                            chartType="GeoChart"
                            width="100%"
                            height="00px"
                            data={geoData}
                            // geoData is static
                            
                        />
                    </div>
                </div>
            </Card>
           
        </>
    );
};

export default SalesTable;
