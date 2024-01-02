import React from 'react';
import { Dialog } from 'primereact/dialog';
import { AiOutlineCalendar } from 'react-icons/ai';

const ViewEvents = ({
    viewEvent,
    setViewEvent,
    eventsData,
    setEventsData,
    invitedUsers,
    setEventEditMode,
    setEvents,
    reset,
    setValue,
    moment,
    setAddEventSidebar,
    setAddUserSidebar,
    setInvitedUsers,
    setSelectedUser,
    setEventDescription,
    setUserEdit,
    userEdit,
    setViewUsersSidebar,
}) => {
    const handleDeleteEvent = () => {
        setEvents((current) =>
            current.filter((meeting) => {
                return meeting.meetingId !== eventsData.meetingId;
            })
        );
        setViewEvent(false);
    };

    const handleEditEvent = () => {
        const startTimeMoment = moment(eventsData.formattedStartTime, 'hh:mm A');
        const endTimeMoment = moment(eventsData.formattedEndTime, 'hh:mm A');
        setValue('eventTitle', eventsData.title);
        setValue('startTime', startTimeMoment.format('HH:mm'));
        setValue('endTime', endTimeMoment.format('HH:mm'));
        setValue('selectedDate', eventsData.start);
        setValue('timezone', eventsData.timezone);
        setAddEventSidebar(true);
        setEventEditMode(true);
        setEventDescription(eventsData.description)
    };

    const viewEventsHeader = (
        <div className="d-flex justify-content-end align-items-center">
            <div className="d-flex align-items-center">
                <div className=" p-1 me-2 d-flex align-item-center border-circle cursor-pointer">
                    <i className="pi pi-user" size="1.2rem" onClick={() => setViewUsersSidebar(true)} />
                </div>

                <div className=" p-1 me-2 d-flex align-item-center border-circle cursor-pointer">
                    <i className="pi pi-user-plus" size="1.2rem" onClick={() => setAddUserSidebar(true)} />
                </div>

                <div className=" p-1 me-2 d-flex align-item-center border-circle cursor-pointer">
                    <i className="pi pi-pencil m-1" size="1.2rem" onClick={handleEditEvent} />
                </div>

                <div className=" p-1 me-2 d-flex align-item-center border-circle cursor-pointer">
                    <i className="pi pi-trash m-1" size="1.2rem" onClick={handleDeleteEvent} />
                </div>

                <div className=" p-1 me-2 d-flex align-item-center border-circle cursor-pointer">
                    <i
                        className="pi pi-times m-1"
                        size="1.2rem"
                        onClick={() => {
                            setViewEvent(false);
                            reset();
                            setEventsData([]);
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Dialog
                header={viewEventsHeader}
                visible={viewEvent}
                closable={false}
                style={{ width: '40vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw', '400px': '100vw' }}
            >
                <div>
                    <div className="d-flex align-items-center mb-3 pl-3">
                        <div className="calander-box "></div>
                        <div className="fs-4 fw-bold pb-2 pl-4">{eventsData.title}</div>
                    </div>
                    <div className="d-flex align-items-center mb-3 pl-3">
                        <div>
                            <AiOutlineCalendar size="17px" className="me-4" />
                        </div>
                        <div>{eventsData.start && <span>{eventsData.start.toDateString()}</span>}</div>
                    </div>
                    <div className="d-flex align-items-center mb-3 pl-3">
                        <div>
                            <i className="pi pi-clock me-4 l-fs-16" />
                        </div>
                        <div>
                            {eventsData.formattedStartTime} - {eventsData.formattedEndTime}
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3 pl-3">
                        <div>
                            <i className="pi pi-user me-4 l-fs-16" />
                        </div>
                        <div>
                            <span
                                className="text-blue-500 underline cursor-pointer"
                                onClick={() => setViewUsersSidebar(true)}
                            >
                                {invitedUsers.length} Invitees
                            </span>{' '}
                            <i
                                className="pi pi-user-plus ml-3 l-fs-16 cursor-pointer"
                                onClick={() => setAddUserSidebar(true)}
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-baseline mb-3 pl-3">
                        <i className="pi pi-sliders-h me-4 l-fs-16" />
                        <div dangerouslySetInnerHTML={{ __html: eventsData.description }} />
                    </div>
                    <div className="d-flex align-items-baseline mb-3 pl-3 mt-1">
                        <i className="pi pi-user-edit me-4 l-fs-16 text-xl" />
                        <div>Created By : <span className='font-bold'>{eventsData.name}</span></div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ViewEvents;
