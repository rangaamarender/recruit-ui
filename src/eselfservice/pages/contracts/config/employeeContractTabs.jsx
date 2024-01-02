import ActiveEmployeeContractListTabs from "../components/ActiveEmployeeContractListTabs";
import InactiveEmployeeContractTabsList from "../components/InactiveEmployeeContractTabsList";

const employeeContractTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "activeContractList",
        label: "Active",

        content: <ActiveEmployeeContractListTabs
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    },
    {
        id: "inactiveContractList",
        label: "Inactive",

        content: <InactiveEmployeeContractTabsList
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    }
]

export default employeeContractTabs;