import ContractGraphsTab from "../container/contractGraphContainer/ContractGraphsTab";
import ResourceGraphsTab from "../container/resourceGraphContainer/ResourceGraphsTab";

export const dashBoardTabs = [
    {
        id: 'contracts',
        label: 'Contracts',

        content: <ContractGraphsTab />,
    },
    {
        id: 'resource',
        label: 'Resource',

        content: <ResourceGraphsTab />,
    },
];
