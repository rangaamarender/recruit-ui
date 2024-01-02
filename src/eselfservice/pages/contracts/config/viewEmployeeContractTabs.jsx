import EmployeeCompanyProfiles from '../container/EmployeeCompanyProfiles';
import EmployeecontractNotes from '../container/EmployeecontractNotes';

const viewEmployeeContractTabs = [
    {
        id: 'contractProfiles',
        label: 'Profile',
        content: <EmployeeCompanyProfiles />,
    },
    {
        id: 'contractNotes',
        label: 'Note',
        content: <EmployeecontractNotes />,
    },
    {
        id: 'contractDocuments',
        label: 'Documents',
        content: "",
    },
    {
        id: 'contractUsers',
        label: 'Users',
        content: "",
    },
    {
        id: 'resources',
        label: 'Resources',
        content: "",
    },
    {
        id: 'contract',
        label: 'Contracts',
        content: "",
    },
    {
        id: 'contractDeductions',
        label: 'Deductions',
        content: "",
    },
    {
        id: 'contractHistory',
        label: 'History',
        content: "",
    }
];

export default viewEmployeeContractTabs;