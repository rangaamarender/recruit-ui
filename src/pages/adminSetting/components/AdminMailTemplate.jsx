import React, { useState, useRef } from 'react';
import AdminReusableComp from './AdminReusableComp';
import AdminMailEditor from '../container/AdminMailEditor';
import AdminMailTemplateTable from '../container/AdminMailTemplateTable';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
const AdminMailTemplate = () => {
    const [visible, setVisible] = useState(false);
    const [mailOn, setMailOn] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [switchState, setSwitchState] = useState(false);
    const [existingMail, setExistingMail] = useState(null);
    const [mailData, setMailData] = useState([
        {
            id: 1,
            name: 'Template Name',
            subject: 'Greetings',
            createdBy: 'Abhishek phulhari',
            createdOn: 'Mar 01, 2022',
        },
    ]);
    const mailColumns = [
        {
            field: 'name',
            header: 'Template Name',
        },
        {
            field: 'subject',
            header: 'Subject',
        },
        {
            field: 'createdBy',
            header: 'Created By',
        },
        {
            field: 'createdOn',
            header: 'Created On',
        },
    ];

    const options = [
        {
            label: 'Select Template',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
        {
            label: 'View Template',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
    ];
    const [mailC, setMailC] = useState(mailColumns);
    const toast = useRef(null);

    const handleMailUpdate = (newMailTemplate) => {
        const normalizedNewSubject = newMailTemplate.subject.toLowerCase().trim();
        const existingMailItem = mailData.find((mail) => mail.subject.toLowerCase().trim() === normalizedNewSubject);

        if (existingMailItem) {
            setExistingMail(existingMailItem);
            if (!mailOn[existingMailItem.id]) {
                setDialogVisible(true);
                setSwitchState(false);
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Subject already exists and is enabled.',
                });
            }
        } else {
            setMailData([...mailData, newMailTemplate]);
            setVisible(false);
        }
    };
    const handlePlus = () => {
        setVisible(true);
    };

    return (
        <div>
            <AdminReusableComp title="Mail Templates" options={options} />
            <div className="row">
                <div className="d-flex justify-content-between">
                    <div></div>
                    <div>
                        <Button icon="pi pi-plus fw-bold fs-6" size="small" onClick={handlePlus} />
                    </div>
                </div>
                <div className="mt-2">
                    <Sidebar
                        visible={visible}
                        showCloseIcon={false}
                        position="right"
                        blockScroll={true}
                        className="w-75"
                        onHide={() => setVisible(false)}
                    >
                        <AdminMailEditor
                            visible={visible}
                            setVisible={setVisible}
                            handleMailUpdate={handleMailUpdate}
                        />
                    </Sidebar>
                </div>
                <div>
                    <AdminMailTemplateTable
                        mailData={mailData}
                        setMailData={setMailData}
                        mailC={mailC}
                        setMailC={setMailC}
                        mailOn={mailOn}
                        setMailOn={setMailOn}
                    />
                </div>
                <div>
                    <Dialog
                        visible={dialogVisible}
                        onHide={() => setDialogVisible(false)}
                        header="Subject Already Exists"
                        footer={
                            <div>
                                <Button
                                    label="Yes"
                                    onClick={() => {
                                        setMailOn((prevMailOn) => ({
                                            ...prevMailOn,
                                            [existingMail.id]: true,
                                        }));
                                        setDialogVisible(false);
                                        setVisible(false);
                                    }}
                                    size='small'
                                />
                                <Button
                                    label="No"
                                    onClick={() => setDialogVisible(false)}
                                    severity='secondary'
                                    size='small'
                                />
                            </div>
                        }
                    >
                        {`Subject already exists but is currently ${
                            switchState ? 'enabled' : 'disabled'
                        }. Do you want to ${switchState ? 'disable' : 'enable'} it?`}
                    </Dialog>
                    <Toast ref={toast} />
                </div>
            </div>
        </div>
    );
};

export default AdminMailTemplate;
