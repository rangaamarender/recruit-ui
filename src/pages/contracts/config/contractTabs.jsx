import ActiveContractListTabs from "../components/ActiveContractListTabs";
import AllContractListTab from "../components/AllContractListTab";
import InactiveContractTabsList from "../components/InactiveContractTabsList";

const contractTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "allContractList",
        label: "All",

        content: <AllContractListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    },
    {
        id: "activeContractList",
        label: "Active",

        content: <ActiveContractListTabs
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    },
    {
        id: "inactiveContractList",
        label: "Inactive",

        content: <InactiveContractTabsList
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    }
]

export default contractTabs;