import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

class ContractUser extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [
        { id: 1, dropdown1: 'Option 1', dropdown2: 'Option A' },
        { id: 2, dropdown1: 'Option 2', dropdown2: 'Option B' },
        { id: 3, dropdown1: 'Option 3', dropdown2: 'Option C' },
      ],
    };
  }

  render() {
    const dropdownOptions = [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ];

    return (
      <div>
        <DataTable value={this.state.tableData}>
          <Column field="id" header="ID" />
          <Column field="dropdown1" header="Dropdown 1" body={(rowData) => <Dropdown options={dropdownOptions} value={rowData.dropdown1} />} />
          <Column field="dropdown2" header="Dropdown 2" body={(rowData) => <Dropdown options={dropdownOptions} value={rowData.dropdown2} />} />
        </DataTable>
      </div>
    );
  }
}

export default ContractUser;
