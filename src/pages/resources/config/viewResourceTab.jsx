import ResourceProfileTab from '../container/resourceViewerTabs/ResourceProfileTab';
import ResourceNotesTab from '../container/resourceViewerTabs/ResourceNotesTab';
import ResourceBillProfileTab from '../container/resourceViewerTabs/ResourceBillProfileTab';
import ResourceTimeSheetTab from '../container/resourceViewerTabs/ResourceTimeSheetTab';
import ResourceExpensesTab from '../container/resourceViewerTabs/ResourceExpensesTab';
import ResourcePayStubsTab from '../container/resourceViewerTabs/ResourcePayStubsTab';
import ResourcePayProfileTab from '../container/resourceViewerTabs/ResourcePayProfileTab';
import ResourceImmigrationTab from '../container/resourceViewerTabs/ResourceImmigrationTab';

export const resourceViewTabs = [
    {
        id: 'profile',
        label: 'Profile',
        content: <ResourceProfileTab />,
    },

    {
        id: 'notes',
        label: 'Notes',
        content: (
            <div className="sidebar-content">
                <ResourceNotesTab />
            </div>
        ),
    },
    {
        id: 'billProfile',
        label: 'Bill Profile (WO)',
        content: (
            <div className="sidebar-content">
                <ResourceBillProfileTab />
            </div>
        ),
    },
    {
        id: 'timeSheets',
        label: 'TimeSheets',
        content: (
            <div className="sidebar-content">
                <ResourceTimeSheetTab />
            </div>
        ),
    },
    {
        id: 'expenses',
        label: 'Expenses',
        content: (
            <div className="sidebar-content">
                <ResourceExpensesTab />
            </div>
        ),
    },
    {
        id: 'payStubs',
        label: 'PayStubs',
        content: (
            <div className="sidebar-content">
                <ResourcePayStubsTab />
            </div>
        ),
    },
    {
        id: 'payProfile',
        label: 'Pay Profile(PO)',
        content: (
            <div className="sidebar-content">
                <ResourcePayProfileTab />
            </div>
        ),
    },
    {
        id: 'immigration',
        label: 'Immigration',
        content: (
            <div className="sidebar-content">
                <ResourceImmigrationTab />
            </div>
        ),
    },
];
