import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import AdminViewMail from './AdminViewMail';
import AdminMailEditor from './AdminMailEditor';
import { Sidebar } from 'primereact/sidebar';

function AdminMailTemplateTable({ mailData, setMailData, mailC, mailOn, setMailOn }) {
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [editPage, setEditPage] = useState(false);
    const [viewPage, setViewPage] = useState();
    const [mailRowData, setMailRowData] = useState(null);

    const handleMailUpdate1 = (updatedMailTemplate) => {
        const updatedMailData = mailData.map((mail) =>
            mail.id === updatedMailTemplate.id ? updatedMailTemplate : mail
        );
        setMailData(updatedMailData);
        setEditPage(false);
    };

    const mailOption = [
        { label: 'View', onClick: () => handlemailView() },
        { label: 'Edit', onClick: () => handlemailEdit() },
    ];

    const handlemailView = () => {
        setViewPage(true);
    };
    const handlemailEdit = () => {
        if (mailRowData) {
            setEditPage(true);
        }
    };

    const mailItem = mailOption.map((item) => ({
        label: <span className="p-text-primary p-2 fs-6 fw-bold w-auto">{item.label}</span>,
        command: () => {
            item.onClick();
        },
    }));
    const mailCheckBox = (rowData) => (
        <Checkbox
            checked={selectedDocuments.some((document) => document.id === rowData.id)}
            onChange={(e) =>
                e.checked
                    ? setSelectedDocuments([...selectedDocuments, rowData])
                    : setSelectedDocuments(selectedDocuments.filter((document) => document.id !== rowData.id))
            }
        />
    );
    const optionMenu = useRef(null);
    const showOption = (event, rowData) => {
        optionMenu.current?.toggle(event, rowData);
        setMailRowData(rowData);
    };
    const activeSwitch = (rowData) => (
        <InputSwitch
            checked={mailOn[rowData.id] || false}
            onChange={(e) => setMailOn((prevMailOn) => ({ ...prevMailOn, [rowData.id]: e.value }))}
            size="small"
        />
    );
    return (
        <div>
            <DataTable value={mailData} size="small">
                <Column body={mailCheckBox}></Column>
                {mailC.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
                <Column body={activeSwitch}></Column>
                <Column
                    body={(rowData) => {
                        return (
                            <div>
                                <Menu model={mailItem} popup ref={optionMenu} id="popup_menu_left" />
                                <i
                                    className="pi pi-ellipsis-v"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        showOption(event, rowData);
                                    }}
                                />
                            </div>
                        );
                    }}
                    rowEditor
                ></Column>
            </DataTable>
            <div>
            <Sidebar
                visible={editPage}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                onHide={()=>setEditPage(false)}
                className="w-75"
            > 
                {editPage && (
                    <AdminMailEditor
                        visible={editPage}
                        setVisible={setEditPage}
                        handleMailUpdate1={handleMailUpdate1}
                        editMode={true}
                        mailRowData={mailRowData}
                        mailData={mailData}
                    />
                )}
                </Sidebar>
            </div>

            <div>
            <Sidebar
                visible={viewPage}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={()=>setViewPage(false)}
            > 
                <AdminViewMail viewPage={viewPage} setViewPage={setViewPage} />
                </Sidebar>
            </div>
        </div>
    );
}

export default AdminMailTemplateTable;
