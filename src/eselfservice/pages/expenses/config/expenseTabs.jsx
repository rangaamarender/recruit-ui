import ApprovedExpensesListTab from "../components/ApprovedExpensesListTab";
import PendingExpensesListTab from "../components/PendingExpensesListTab";

const expenseTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "ApprovedExpensesListTab",
        label: "Approved",

        content: <ApprovedExpensesListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
   
    {
        id: "PendingExpensesListTab",
        label: "Pending",

        content: <PendingExpensesListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    }
   
   
   
]

export default expenseTabs;