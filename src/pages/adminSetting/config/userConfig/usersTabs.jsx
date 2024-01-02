import HistoryTab from '../HistoryTab';
import NotesTab from '../NotesTab';
import PersonalTab from '../PersonalTab';

export const usersTabs = ({ isEditClick }) => [
    {
        id: 'personal',
        label: 'Personal',
        content: <PersonalTab isEditClick={isEditClick} />,
    },

    {
        id: 'notes',
        label: 'Notes',
        content: <NotesTab />,
    },
    {
        id: 'history',
        label: 'History',
        content: <HistoryTab />,
    },
];
