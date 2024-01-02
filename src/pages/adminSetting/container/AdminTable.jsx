import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AiOutlineDelete } from 'react-icons/ai';

const AdminTable = () => {
    const [holidays, setHolidays] = useState([
        { id: 1, date: '1/1/2023', name: 'New Year', type: 'Public Holiday', status: 'pending' },
        { id: 2, date: '8/15/2023', name: 'Independence Day', type: 'Public Holiday', status: 'pending' },
    ]);
    const holiDayType = [
        {
            value: 'Public Holiday',
            label: 'Public Holiday',
        },
        {
            value: 'Flexible Holiday',
            label: 'Flexible Holiday',
        },
    ];
    const [isRowEditing, setIsRowEditing] = useState(false);
    const [editingRowIndex, setEditingRowIndex] = useState(null);

    const onRowEditComplete = (e) => {
        setIsRowEditing(false);
        setEditingRowIndex(null);
        let editedHolidays = [...holidays];
        let { newData, index } = e;

        const editedHolidayNameProcessed = newData.name.replace(/\s/g, '').toLowerCase();
        const existingHoliday = holidays.find(
            (holiday) =>
                holiday.id !== newData.id &&
                holiday.name.replace(/\s/g, '').toLowerCase() === editedHolidayNameProcessed
        );

        if (existingHoliday) {
            alert('Error: Holiday name already exists');
        } else {
            editedHolidays[index] = newData;
            setHolidays(editedHolidays);
        }
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
                style={{ width: '150px' }}
            />
        );
    };
    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={holiDayType}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder=""
            />
        );
    };
    const handleDeleteClick = (rowData) => {
        const deleteHoliDay = holidays.filter((item) => item !== rowData);
        setHolidays(deleteHoliDay);
    };
    const actionBody = (rowData, column) => {
      const rowIndex = holidays.indexOf(rowData);

      if (isRowEditing && editingRowIndex === rowIndex) {
          return null; // Hide delete button for the editing row
      }

      return (
          <div className='cursor-pointer'>
              <AiOutlineDelete className="text-start" size="1.2rem" onClick={() => handleDeleteClick(rowData)} />
          </div>
      );
  };

    return (
        <div>
            <DataTable
                value={holidays}
                editMode="row"
                dataKey="id"
                onRowEditComplete={onRowEditComplete}
                onRowEditInit={(e) => {
                  setIsRowEditing(true);
                  setEditingRowIndex(holidays.indexOf(e.data));
              }}
              onRowEditCancel={() => {
                  setIsRowEditing(false);
                  setEditingRowIndex(null);
              }}
            >
                <Column
                    field="date"
                    header="Date"
                    editor={(options) => textEditor(options)}
                    style={{ width: '20%' }}
                ></Column>
                <Column
                    field="name"
                    header="Name"
                    editor={(options) => textEditor(options)}
                    style={{ width: '25%' }}
                ></Column>
                <Column
                    field="type"
                    header="Type"
                    editor={(options) => statusEditor(options)}
                    style={{ width: '25%' }}
                ></Column>
                {/* <Column field="status" header="status"  editor={(options) => textEditor(options)} style={{width:"20%"}}></Column> */}
                <Column
                    rowEditor
                    headerStyle={{ width: '8%', minWidth: '8rem' }}
                    bodyStyle={{ textAlign: 'end' }}
                ></Column>
                <Column body={actionBody}></Column>
            </DataTable>
        </div>
    );
};

export default AdminTable;

