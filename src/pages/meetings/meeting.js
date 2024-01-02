import React, { useEffect, useState } from 'react';
import { Calendar as SmallCalendar } from 'react-calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import PlainLayout from '../../components/layouts/PlainLayout';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar/dist/Calendar.css';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import { useDispatch } from 'react-redux';
import { Sidebar } from 'primereact/sidebar';
import { useForm } from 'react-hook-form';
import AddMeeting from './AddMeeting';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';
import ViewEvents from './ViewEvents';
import AddInvitee from './AddInvitee';
import VieInvitees from './ViewInvitees';
import { Button } from 'primereact/button';

const localizer = momentLocalizer(moment);

const Meeting = () => {
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [eventEditMode, setEventEditMode] = useState(false);
    const [eventsData, setEventsData] = useState([]);
    const [viewEvent, setViewEvent] = useState(false);
    const [eventDescription, setEventDescription] = useState('');
    const [addEventSidebar, setAddEventSidebar] = useState(false);
    const [addUserSidebar, setAddUserSidebar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [meetingId, setMeetingId] = useState(generateRandomCode());
    const [invitedUsers, setInvitedUsers] = useState([
        { id: 1, firstName: 'Richard', lastName: 'Shotwell', email: 'Richard@gmail.com', phoneNumber: '8197540236' },
        { id: 2, firstName: 'Lionel', lastName: 'Cironneau', email: 'Lionel@gmail.com', phoneNumber: '9837460251' },
        { id: 3, firstName: 'Daniel', lastName: 'Zuchnik', email: 'Daniel@gmail.com', phoneNumber: '9280164357' },
    ]);
    const [id, setId] = useState(4);
    const [selectedUser, setSelectedUser] = useState();
    const [userEdit, setUserEdit] = useState(false);
    const [viewUsersSidebar, setViewUsersSidebar] = useState(false);
    const [endTimeErr, setEndTimeErr] = useState('');

    const handleId = () => {
        setId(id + 1);
    };
    useEffect(() => {
        dispatch(setCurrentPageName('Meetings'));
    }, [dispatch]);

    // Function to remove duplicate users based on their id
    const removeDuplicateUsers = (users) => {
        const userMap = new Map();
        const uniqueUsers = users.filter((user) => {
            if (!userMap.has(user.id)) {
                userMap.set(user.id, true);
                return true;
            }
            return false;
        });
        return uniqueUsers;
    };

    useEffect(() => {
        // Remove duplicates and update the state
        setInvitedUsers((currentUsers) => removeDuplicateUsers(currentUsers));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm();

    function generateRandomCode() {
        const min = 10000000;
        const max = 99999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleUniueId() {
        const newRandomCode = generateRandomCode();
        setMeetingId(newRandomCode);
    }
    const data = watch();
    const toast = useRef(null);

    const handleAddEvent = ({ start }) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        if (start < currentDate) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Cannot add events for past dates.',
                life: 2500,
            });
            return;
        }
        setValue('selectedDate', start);
        setValue('timezone', '+05:30');
        setValue('eventTitle', '');
        setSelectedDate(start);
        setAddEventSidebar(true);
        setEventEditMode(false);
        handleUniueId();
    };

    const handleSmallCalander = (e) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        if (e < currentDate) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Cannot add events for past dates.',
                life: 2500,
            });
            return;
        }
        setValue('selectedDate', e);
        setValue('timezone', '+05:30');
        setValue('eventTitle', '');
        setAddEventSidebar(true);
        handleUniueId();
    };

    const handleAddEventClose = () => {
        setAddEventSidebar(false);
        // setSelectedDate(new Date());
        setEventDescription('');
        setEventEditMode(false);
        setEventEditMode(false);
        reset();
        setEndTimeErr('');
    };

    const handleCreateEvent = () => {
        const startMoment = moment(data.startTime, 'HH:mm');
        const endMoment = moment(data.endTime, 'HH:mm');
        const newEvent = {
            meetingId: meetingId,
            title: data.eventTitle,
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
            formattedStartTime: startMoment.format('hh:mm A'),
            formattedEndTime: endMoment.format('hh:mm A'),
            timezone: data.timezone,
            name: data.firstName,
        };
        if (endMoment.isBefore(startMoment)) {
            setEndTimeErr("EndTime cant't be greater than StartTime");
        } else {
            setEndTimeErr('');
            setEvents([...events, newEvent]);
            setEventDescription('');
            handleAddEventClose();
            reset();
        }
    };

    const handleVieEvent = (e) => {
        setEventsData(e);
        setViewEvent(true);
    };

    return (
        <PlainLayout>
            <div className="grid">
                <div className="md:col-4">
                    <div>
                        <div className="mb-3">
                            <SmallCalendar
                                onChange={(e) => setSelectedDate(e)}
                                value={selectedDate}
                                onClickDay={handleSmallCalander}
                                className="react-calander-bg w-full"
                            />
                        </div>
                        <div className="mx-2 mb-3">
                            <div className="flex justify-content-between align-items-center my-2">
                                <div className="fs-4 fw-bold">Meetings</div>
                                <Button icon='pi pi-plus' size='small' label='Add Meeting' onClick={handleAddEvent}/>
                            </div>
                            <div className="events">
                                {events.map((event, index) => {
                                    return (
                                        <div
                                            className="flex align-items-center gap-3 border border-round px-3 py-1 my-3"
                                            key={index}
                                        >
                                            <div>
                                                <Avatar
                                                    size="large"
                                                    image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png"
                                                    shape="circle"
                                                />
                                            </div>
                                            <div>
                                                <div className="fw-bold">{event.title}</div>
                                                {event.start.toDateString()}
                                                <br />
                                                {event.formattedStartTime} - {event.formattedEndTime}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {events.length === 0 && <p>No Events found</p>}
                        </div>
                    </div>
                </div>
                <div className="md:col-8 sm:col-12">
                    <Toast ref={toast} />
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        selectable
                        onSelectSlot={handleAddEvent}
                        onSelectEvent={handleVieEvent}
                        className="p-sidebar-header"
                        style={{ height: '90vh' }}
                    />
                </div>
            </div>
            <Sidebar
                visible={addEventSidebar}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleAddEventClose}
            >
                <AddMeeting
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    setAddEventSidebar={setAddEventSidebar}
                    setSelectedDate={setSelectedDate}
                    handleSubmit={handleSubmit}
                    handleAddEventClose={handleAddEventClose}
                    setEvents={setEvents}
                    events={events}
                    data={data}
                    selectedDate={selectedDate}
                    setEventEditMode={setEventEditMode}
                    moment={moment}
                    eventDescription={eventDescription}
                    watch={watch}
                    eventsData={eventsData}
                    eventEditMode={eventEditMode}
                    setEventDescription={setEventDescription}
                    handleCreateEvent={handleCreateEvent}
                    setViewEvent={setViewEvent}
                    setEndTimeErr={setEndTimeErr}
                    endTimeErr={endTimeErr}
                />
            </Sidebar>
            <Sidebar
                visible={addUserSidebar}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={() => {
                    setAddUserSidebar(false);
                    setUserEdit(false);
                }}
            >
                <AddInvitee
                    setInvitedUsers={setInvitedUsers}
                    invitedUsers={invitedUsers}
                    setAddUserSidebar={setAddUserSidebar}
                    selectedUser={selectedUser}
                    userEdit={userEdit}
                    handleId={handleId}
                    setUserEdit={setUserEdit}
                    id={id}
                />
            </Sidebar>

            <Sidebar
                visible={viewUsersSidebar}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={() => {
                    setViewUsersSidebar(false);
                }}
            >
                <VieInvitees
                    invitedUsers={invitedUsers}
                    setViewUsersSidebar={setViewUsersSidebar}
                    setInvitedUsers={setInvitedUsers}
                    setSelectedUser={setSelectedUser}
                    setAddUserSidebar={setAddUserSidebar}
                    setUserEdit={setUserEdit}
                />
            </Sidebar>

            <ViewEvents
                setEventsData={setEventsData}
                setEventEditMode={setEventEditMode}
                setValue={setValue}
                moment={moment}
                setEventDescription={setEventDescription}
                eventsData={eventsData}
                reset={reset}
                setAddEventSidebar={setAddEventSidebar}
                setEvents={setEvents}
                viewEvent={viewEvent}
                setViewEvent={setViewEvent}
                invitedUsers={invitedUsers}
                setAddUserSidebar={setAddUserSidebar}
                setInvitedUsers={setInvitedUsers}
                setSelectedUser={setSelectedUser}
                setUserEdit={setUserEdit}
                userEdit={userEdit}
                setViewUsersSidebar={setViewUsersSidebar}
            />
        </PlainLayout>
    );
};

export default Meeting;
