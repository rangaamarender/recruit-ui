import React, { useEffect } from 'react';
import CustomInputText from '../../components/controls/CustomInputText';
import CustomCalander from '../../components/controls/CustomCalender';
import CustomDropdown from '../../components/controls/CustomDropdown';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import CustomInputTime from '../../components/controls/CustomInputTime';
import TitleHeaderOnly from '../../components/header/TitleHeaderOnly';

const AddMeeting = ({
    control,
    errors,
    handleSubmit,
    setEventDescription,
    eventDescription,
    handleAddEventClose,
    setValue,
    data,
    setAddEventSidebar,
    events,
    eventEditMode,
    setSelectedDate,
    setEvents,
    moment,
    watch,
    setEndTimeErr,
    eventsData,
    selectedDate,
    handleCreateEvent,
    setViewEvent,
    setEventEditMode,
    endTimeErr,
}) => {
    const handleTextChange = (e) => {
        setEventDescription(e.htmlValue);
    };
    useEffect(() => {
        if (data.timezone) {
            const currentTimezoneOffset = new Date().getTimezoneOffset();
            const selectedTimezoneOffset =
                parseInt(data.timezone.split(':')[0]) * 60 + parseInt(data.timezone.split(':')[1]);
            const timezoneOffsetDifference = (selectedTimezoneOffset + currentTimezoneOffset) * 60 * 1000;
            const currentTime = new Date(Date.now() + timezoneOffsetDifference);
            let minutes = currentTime.getMinutes();
            const roundedMinutes = Math.ceil(minutes / 15) * 15;
            const hours = currentTime.getHours().toString().padStart(2, '0');
            minutes = roundedMinutes >= 60 ? '00' : roundedMinutes.toString().padStart(2, '0');
            setValue('startTime', `${hours}:${minutes}`);
            const endHours = (currentTime.getHours() + 1).toString().padStart(2, '0');
            setValue('endTime', `${endHours}:${minutes}`);
        }
    }, [data.timezone]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setEndTimeErr('');
    }, [data.endTime]); // eslint-disable-line react-hooks/exhaustive-deps
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

    const handleUpdateEvent = () => {
        const startMoment = moment(data.startTime, 'HH:mm');
        const endMoment = moment(data.endTime, 'HH:mm');

        const newState = events.map((obj) => {
            if (obj.meetingId === eventsData.meetingId) {
                return {
                    ...obj,
                    title: data.eventTitle,
                    formattedStartTime: startMoment.format('hh:mm A'),
                    formattedEndTime: endMoment.format('hh:mm A'),
                    description: eventDescription,
                    start: new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate(),
                        startMoment.hour(),
                        startMoment.minute()
                    ),
                    end: new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate(),
                        endMoment.hour(),
                        endMoment.minute()
                    ),
                    timezone: data.timezone,
                };
            }
            return obj;
        });
        if (endMoment.isBefore(startMoment)) {
            setEndTimeErr("EndTime cant't be greater than StartTime");
        } else {
            setEndTimeErr('');
            setEvents(newState);
            setAddEventSidebar(false);
            setViewEvent(false);
            setEventEditMode(false);
            setEventDescription('');
        }
    };

    const validateStartTime = (value, context) => {
        if (!value) {
            return true;
        }
        const [hours, minutes] = value.split(':').map(Number);
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        if (context.isToday) {
            if (hours < currentHours || (hours === currentHours && minutes <= currentMinutes)) {
                return 'Please enter a valid time';
            }
        } else {
            if (hours > 24 || (hours === 24 && minutes > 0) || minutes >= 60) {
                return 'Please enter a valid time';
            }
        }

        return true;
    };

    const validateEndTime = (value, context) => {
        if (!value) {
            return true;
        }
        const [hours, minutes] = value.split(':').map(Number);
        const [startHours, startMinutes] = context.startTime.split(':').map(Number);

        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        if (context.isToday) {
            if (
                hours < currentHours ||
                (hours === currentHours && minutes <= currentMinutes) ||
                hours < startHours ||
                (hours === startHours && minutes <= startMinutes)
            ) {
                return 'Please enter a valid time';
            }
        } else {
            if (hours > 24 || (hours === 24 && minutes > 0) || minutes >= 60) {
                return 'Please enter a valid time';
            }
        }

        return true;
    };

    let required = true;
    return (
        <div className="h-screen">
            <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                <TitleHeaderOnly
                    title={eventEditMode ? 'Update Meeting' : 'Create New Meeting'}
                    onClick={handleAddEventClose}
                />
            </div>
            <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="eventTitle"
                    labelId="title.label"
                    required={required}
                    requiredMsg="title.required"
                    autoFocus
                    className="md:col-12"
                />
                <div className="md:flex">
                    <CustomCalander
                        control={control}
                        required={required}
                        showIcon={true}
                        errors={errors}
                        minDate={new Date()}
                        className="md:col-4 col-12"
                        name="selectedDate"
                        labelId="date.label"
                        onChange={(e) => {
                            setValue('selectedDate', e.value);
                            setSelectedDate(e.value);
                        }}
                        requiredMsg="date.required"
                    />
                    <CustomInputTime
                        control={control}
                        errors={errors}
                        required={required}
                        placeholder="HH:MM"
                        mask="99:99"
                        requiredMsg="starttime.required"
                        name="startTime"
                        labelId="starttime.label"
                        className="md:col-4 col-12"
                        rules={{
                            required: 'StartTime is required',
                            validate: (value) =>
                                validateStartTime(value, { isToday: moment(selectedDate).isSame(moment(), 'day') }),
                        }}
                    />
                    <div className="flex flex-column md:col-4 col-12">
                        <CustomInputTime
                            control={control}
                            errors={errors}
                            name="endTime"
                            mask="99:99"
                            placeholder="HH:MM"
                            requiredMsg="endtime.required"
                            required={required}
                            labelId="endtime.label"
                            className="mb-0"
                            helpMsg={endTimeErr}
                            rules={{
                                required: 'EndTime is required',
                                validate: (value) =>
                                    validateEndTime(value, {
                                        isToday: moment(selectedDate).isSame(moment(), 'day'),
                                        startTime: watch('startTime'),
                                    }),
                            }}
                        />
                    </div>
                </div>
                <div className="md:flex">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="meetingLocation"
                        labelId="meetingLocation.label"
                        className="md:col-6 col-12"
                    />
                    <CustomDropdown
                        control={control}
                        className="md:col-6 col-12"
                        errors={errors}
                        options={cities.map((city) => ({
                            label: city.name,
                            value: city.timezone_offset,
                        }))}
                        optionLabel="label"
                        labelId="timeZone.label"
                        required={required}
                        requiredMsg="timeZone.required"
                        name="timezone"
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="description">Description</label>
                    <Editor
                        value={eventDescription}
                        name="description"
                        onTextChange={handleTextChange}
                        style={{ height: '150px' }}
                    />
                </div>
                {!eventEditMode && (
                    <div>
                        <h3>Details</h3>
                        <div className="md:flex">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="firstName"
                                labelId="firstName.label"
                                className="md:col-6 sm:col-12"
                                defaultValue="Lucid"
                            />
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="lastName"
                                labelId="lastName.label"
                                className="md:col-6 sm:col-12"
                            />
                        </div>
                        <div className="md:flex">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="phoneNumber"
                                labelId="phoneNumber.label"
                                className="md:col-6 sm:col-12"
                            />
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="email"
                                labelId="email"
                                className="md:col-6 sm:col-12"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                    <Button
                        label="Cancel"
                        type="button"
                        onClick={handleAddEventClose}
                        // icon="pi pi-times"
                        severity="secondary"
                        size="small"
                        // className="p-button-text company-primary-text"
                    />
                    {eventEditMode ? (
                        <Button
                            label="Update"
                            onClick={handleSubmit(handleUpdateEvent)}
                            size="small"
                            // icon="pi pi-check"
                            // className="company-primary-btn"
                        />
                    ) : (
                        <Button
                            label="Add"
                            onClick={handleSubmit(handleCreateEvent)}
                            size="small"
                            // icon="pi pi-check"
                            // className="company-primary-btn"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddMeeting;
