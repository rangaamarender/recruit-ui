import ActiveContractListWoTabs from "../components/contractWoTabs/ActiveContractListWoTabs";
import AllContractListWoTab from "../components/contractWoTabs/AllContractListWoTab";
import InactiveContractWoTabsList from "../components/contractWoTabs/InactiveContractWoTabsList";

const contractWoTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "allContractListWoTab",
        label: "All",

        content: <AllContractListWoTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    },
    {
        id: "activeContractList",
        label: "Active",

        content: <ActiveContractListWoTabs
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    },
    {
        id: "inactiveContractList",
        label: "Inactive",

        content: <InactiveContractWoTabsList
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    }
]

export default contractWoTabs;