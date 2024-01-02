import ContractProfiles from '../container/viewTabSteps/ContractProfiles';
import ContractNotes from '../container/viewTabSteps/ContractNotes';
import ContractDocument from '../container/viewTabSteps/ContractDocument';
// import ContractResources from '../container/viewTabSteps/ContractNotes';
import ContractDeductions from '../container/viewTabSteps/ContractDeductions';
import ContractHistory from '../container/viewTabSteps/ContractHistory';
// import ContractUsers from '../container/viewTabSteps/ContractUsers';
import Contracts from '../container/viewTabSteps/ContractTab';
import ContractResources from '../container/viewTabSteps/ContractResources';
// import ContractResources from '../container/viewTabSteps/ContractResources';
const supplierContractsViewerTabs = [
    {
        id: 'contractProfiles',
        label: 'Profile',
        content: <ContractProfiles />,
    },
    {
        id: 'contractNotes',
        label: 'Note',
        content: <ContractNotes />,
    },
    {
        id: 'contractDocuments',
        label: 'Documents',
        content: <ContractDocument />,
    },
    // {
    //     id: 'contractUsers',
    //     label: 'Users',
    //     content: <ContractResources />,
    // },
    // {
    //     id: 'resources',
    //     label: 'ResourcesCont',
    //     content: <ContractResources />,
    // },
    // {
    //     id: 'contract',
    //     label: 'Contracts',
    //     content: <Contracts />,
    // },
    // {
    //     id: 'contractDeductions',
    //     label: 'Deductions',
    //     content: <ContractDeductions />,
    // },
    // {
    //     id: 'contractHistory',
    //     label: 'History',
    //     content: <ContractHistory />,
    // }
];

export default supplierContractsViewerTabs;