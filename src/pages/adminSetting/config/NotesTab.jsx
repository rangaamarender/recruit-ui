import React from 'react';
import Notes from '../../../components/common/Notes';

const NotesTab = () => {
    return (
        <>
            <div className="p-3">
                <div className="fs-5 fw-bold p-text-primary border-bottom border-light pb-1 mb-2">Notes</div>

                <Notes />
            </div>
        </>
    );
};

export default NotesTab;
