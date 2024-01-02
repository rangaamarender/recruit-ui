import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Accordion, AccordionTab } from 'primereact/accordion';
import CustomCalander from '../../../components/controls/CustomCalender';
import { useForm } from 'react-hook-form';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import AdminUploadHoliday from '../container/AdminUploadHoliday';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import AdminColor from '../container/AdminColor';
import CompanyLogo from '../container/CompanyLogo';

const AdminCompanies = () => {
    const {
        control,
        formState: { errors },
        reset,
        setValue,
        handleSubmit,
    } = useForm();
    const required = true;
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [editRowData, setEditRowData] = useState(null);
    const [mode, setMode] = useState('create');
    const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
    const [holidays, setHolidays] = useState([
        { id: 1, date: '1/1/2023', name: 'New Year', type: 'Public Holiday' },
        { id: 2, date: '8/15/2023', name: 'Independence Day', type: 'Public Holiday' },
    ]);
    const columns = [
        { field: 'date', header: 'Date' },
        { field: 'name', header: 'Holiday Name' },
        { field: 'type', header: 'Type' },
    ];

    const languages = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
    ];
    const cities = [
        { name: '(GMT +5:30) Indian Standard Time (IST)', timezone_offset: '+05:30' },
        { name: '(GMT -12:00) Eniwetok, Kwajalein', timezone_offset: '-12:00' },
        { name: '(GMT -11:00) Midway Island, Samoa', timezone_offset: '-11:00' },
        { name: '(GMT -10:00) Hawaii', timezone_offset: '-10:00' },
        { name: '(GMT -9:30) Taiohae', timezone_offset: '-09:30' },
        { name: '(GMT -9:00) Alaska', timezone_offset: '-09:00' },
        { name: '(GMT -8:00) Pacific Time (US & Canada)', timezone_offset: '-08:00' },
        { name: '(GMT -7:00) Mountain Time (US & Canada)', timezone_offset: '-07:00' },
        { name: '(GMT -6:00) Central Time (US & Canada), Mexico City', timezone_offset: '-06:00' },
        { name: '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima', timezone_offset: '-05:00' },
        { name: '(GMT -4:30) Caracas', timezone_offset: '-04:30' },
        { name: '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz', timezone_offset: '-04:00' },
        { name: '(GMT -3:30) Newfoundland', timezone_offset: '-03:30' },
        { name: '(GMT -3:00) Brazil, Buenos Aires, Georgetown', timezone_offset: '-03:00' },
        { name: '(GMT -2:00) Mid-Atlantic', timezone_offset: '-02:00' },
        { name: '(GMT -1:00) Azores, Cape Verde Islands', timezone_offset: '-01:00' },
        { name: '(GMT) Western Europe Time, London, Lisbon, Casablanca', timezone_offset: '+00:00' },
        { name: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris', timezone_offset: '+01:00' },
        { name: '(GMT +2:00) Kaliningrad, South Africa', timezone_offset: '+02:00' },
        { name: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg', timezone_offset: '+03:00' },
        { name: '(GMT +3:30) Tehran', timezone_offset: '+03:30' },
        { name: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi', timezone_offset: '+04:00' },
        { name: '(GMT +4:30) Kabul', timezone_offset: '+04:30' },
        { name: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent', timezone_offset: '+05:00' },
        { name: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi', timezone_offset: '+05:30' },
        { name: '(GMT +5:45) Kathmandu, Pokhara', timezone_offset: '+05:45' },
        { name: '(GMT +6:00) Almaty, Dhaka, Colombo', timezone_offset: '+06:00' },
        { name: '(GMT +6:30) Yangon, Mandalay', timezone_offset: '+06:30' },
        { name: '(GMT +7:00) Bangkok, Hanoi, Jakarta', timezone_offset: '+07:00' },
        { name: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong', timezone_offset: '+08:00' },
        { name: '(GMT +8:45) Eucla', timezone_offset: '+08:45' },
        { name: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk', timezone_offset: '+09:00' },
        { name: '(GMT +9:30) Adelaide, Darwin', timezone_offset: '+09:30' },
        { name: '(GMT +10:00) Eastern Australia, Guam, Vladivostok', timezone_offset: '+10:00' },
        { name: '(GMT +10:30) Lord Howe Island', timezone_offset: '+10:30' },
        { name: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia', timezone_offset: '+11:00' },
        { name: '(GMT +11:30) Norfolk Island', timezone_offset: '+11:30' },
        { name: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka', timezone_offset: '+12:00' },
        { name: '(GMT +12:45) Chatham Islands', timezone_offset: '+12:45' },
        { name: '(GMT +13:00) Apia, Nukualofa', timezone_offset: '+13:00' },
        { name: '(GMT +14:00) Line Islands, Tokelau', timezone_offset: '+14:00' },
    ];
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
    const handleHolidaySubmit = (data) => {
        const { selectedDate, eventTitle, holidayType } = data;
        const formattedDate = selectedDate.toLocaleDateString();
        const isDateAlreadyExists = holidays.some((holiday) => holiday.date === formattedDate);
        if (isDateAlreadyExists) {
            setError('Holiday with the same date already exists. Please choose a different date.');
            return;
        }
        const newHoliday = {
            id: holidays.length + 1,
            date: formattedDate,
            name: eventTitle,
            type: holidayType,
        };
        setHolidays([...holidays, newHoliday]);
        setError('');
        setIsCreateFormVisible(false);
        reset();
    };

    const handleHolidayUpdate = (data) => {
        const { eventTitle, holidayType } = data;
        const trimmedTitle = eventTitle.trim().toLowerCase();
        const isTitleAlreadyExists = holidays.some(
            (holiday) => holiday.name.trim().toLowerCase() === trimmedTitle && holiday.id !== editRowData.id
        );

        if (isTitleAlreadyExists) {
            setError('Holiday with the same title already exists. Please choose a different title.');
            return;
        }
        const updatedHolidays = holidays.map((holiday) =>
            holiday.id === editRowData.id ? { ...holiday, name: trimmedTitle, type: holidayType } : holiday
        );
        setHolidays(updatedHolidays);
        setError('');
        setIsCreateFormVisible(false);
        reset();
    };

    const handleDeleteClick = (rowData) => {
        const deleteHoliDay = holidays.filter((item) => item !== rowData);
        setHolidays(deleteHoliDay);
    };

    const handleHolidayEdit = (rowData) => {
        setEditRowData(rowData);
        setIsCreateFormVisible(true);
        setMode('edit');
        setValue('selectedDate', new Date(rowData.date));
        setValue('eventTitle', rowData.name);
        setValue('holidayType', rowData.type);
    };

    const handleHolidayCancel = () => {
        setIsCreateFormVisible(false);
        setError('');
        reset();
    };

    return (
        <div>
            <div className="row">
                <h4 className="fw-bold">Company Settings</h4>
                <hr></hr>
                <div>
                    <CompanyLogo />
                </div>

                <div className="mt-3">
                    <AdminColor />
                </div>

                <div className="mt-3">
                    <div className="fw-bold">View Holiday Calendar</div>
                    <div className='mt-2'>
                        <Accordion>
                            <AccordionTab header="Holiday Calendar">
                                <div className="text-end">
                                    <Button
                                        type="button"
                                        icon="pi pi-plus"
                                        label="Create"
                                        size="small"
                                        text
                                        onClick={(rowData) => {
                                            setIsCreateFormVisible(!isCreateFormVisible);
                                            setMode('create');
                                        }}
                                    ></Button>
                                    <Button
                                        type="button"
                                        label="Upload"
                                        text
                                        size="small"
                                        onClick={() => setIsUploadFormVisible(!isUploadFormVisible)}
                                    ></Button>
                                </div>
                                {/* upload */}
                                <div>
                                    {isUploadFormVisible && (
                                        <AdminUploadHoliday onClose={() => setIsUploadFormVisible(false)} />
                                    )}
                                </div>

                                {isCreateFormVisible && (
                                    <div className="card mt-2 p-2">
                                        <div className="d-flex gap-3">
                                            <div className="col-md-4">
                                                <CustomCalander
                                                    control={control}
                                                    required={required}
                                                    showIcon={true}
                                                    errors={errors}
                                                    className=""
                                                    name="selectedDate"
                                                    labelId="date.label"
                                                    onChange={(e) => {
                                                        setValue('selectedDate', e.value);
                                                    }}
                                                    requiredMsg="date.required"
                                                    disabled={mode === 'edit'}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <CustomInputText
                                                    control={control}
                                                    errors={errors}
                                                    name="eventTitle"
                                                    labelId="title.label"
                                                    required={required}
                                                    requiredMsg="title.required"
                                                    autoFocus
                                                    className=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <CustomDropdown
                                                    control={control}
                                                    className=""
                                                    errors={errors}
                                                    options={holiDayType}
                                                    optionLabel="label"
                                                    labelId="Holiday Type"
                                                    required={required}
                                                    requiredMsg="holidayType.required"
                                                    name="holidayType"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-content-end">
                                            <div>
                                                <Button
                                                    label="Cancel"
                                                    size="small"
                                                    severity="secondary"
                                                    type="button"
                                                    onClick={handleHolidayCancel}
                                                />
                                            </div>
                                            <div>
                                                {mode === 'edit' ? (
                                                    <Button
                                                        label="Update"
                                                        size="small"
                                                        type="button"
                                                        onClick={handleSubmit(handleHolidayUpdate)}
                                                    />
                                                ) : (
                                                    <Button
                                                        label="Submit"
                                                        size="small"
                                                        type="button"
                                                        onClick={handleSubmit(handleHolidaySubmit)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div>{error && <div className="text-danger">{error}</div>}</div>
                                <div className="mb-2">
                                    <DataTable value={holidays} stripedRows size={'small'}>
                                        {columns.map((column) => (
                                            <Column key={column.field} field={column.field} header={column.header} />
                                        ))}
                                        <Column
                                            body={(rowData) => (
                                                <div className="d-flex align-item-center gap-4 cursor-pointer">
                                                    <div>
                                                        <FiEdit2
                                                            className="m-1"
                                                            size="1rem"
                                                            onClick={() => handleHolidayEdit(rowData)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <AiOutlineDelete
                                                            className="m-1"
                                                            size="1rem"
                                                            onClick={() => handleDeleteClick(rowData)}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            headerStyle={{ width: '10%', minWidth: '1rem' }}
                                            bodyStyle={{ textAlign: 'center' }}
                                        />
                                    </DataTable>
                                </div>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>

                <div className="mt-3">
                    <div className="fw-bold">Select Your Preferred Language</div>
                    <div className="d-flex align-items-center gap-5 mt-2">
                        <div>
                            <Dropdown options={languages} placeholder="Select Language" />
                        </div>
                        <div>
                            <Button label="Submit" size="small" />
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <div className="fw-bold">Select Timezone</div>
                    <div className="d-flex align-items-center gap-5 mt-2">
                        <div>
                            <Dropdown
                                options={cities.map((city) => ({
                                    label: city.name,
                                    value: city.timezone_offset,
                                }))}
                                placeholder="Select Timezone"
                            />
                        </div>
                        <div>
                            <Button label="Submit" size="small" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCompanies;
