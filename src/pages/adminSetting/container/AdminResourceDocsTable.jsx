import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const AdminResourceDocsTable = ({ resourceDocument, setResourceDocument, handleDocEditClick, setShowDocSidebar }) => {
    const handleDocDeleteClick = (rowData) => {
        setShowDocSidebar(false);
        const updatedDoc = resourceDocument.filter((item) => item !== rowData);
        setResourceDocument(updatedDoc);
    };

    return (
        <>
            <div>
                <DataTable value={resourceDocument} size={'small'}>
                    <Column field="doctype" header="Document Type" />
                    <Column
                        body={(rowData) => (
                            <div className="d-flex align-item-center gap-4 cursor-pointer">
                                <div>
                                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleDocEditClick(rowData)} />
                                </div>
                                <div>
                                    <AiOutlineDelete
                                        className="m-1"
                                        size="1rem"
                                        onClick={() => handleDocDeleteClick(rowData)}
                                    />
                                </div>
                            </div>
                        )}
                        headerStyle={{ width: '10%', minWidth: '1rem' }}
                        bodyStyle={{ textAlign: 'center' }}
                    />
                </DataTable>
            </div>
        </>
    );
};

export default AdminResourceDocsTable;
