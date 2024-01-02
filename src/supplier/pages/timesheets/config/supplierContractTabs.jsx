import ActiveSupplierContractListTab from "../components/ActiveSupplierContractListTab";
import InactiveSupplierContractTabList from "../components/InactiveSupplierContractListTab";


const supplierContractTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "activeContractList",
        label: "Active",

        content: <ActiveSupplierContractListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    },
    {
        id: "inactiveContractList",
        label: "Inactive",

        content: <InactiveSupplierContractTabList
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    }
]

export default supplierContractTabs;