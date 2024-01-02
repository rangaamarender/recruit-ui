import AllEmployeeTimesheetListTab from "../components/AllEmployeeTimesheetListTab";
import ApprovedEmployeeTimesheetListTab from "../components/ApprovedEmployeeTimesheetListTab";
import DeclinedEmployeeTimesheetListTab from "../components/DeclinedEmployeeTimesheetListTab";
import PendingEmployeeTimesheetListTab from "../components/PendingEmployeeTimesheetListTab";

const employeeTimesheetTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "allTimesheetList",
        label: "All",

        content: <AllEmployeeTimesheetListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
   
    {
        id: "ApprovedTimesheetList",
        label: "Appeoved",

        content: <ApprovedEmployeeTimesheetListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
   
    {
        id: "pendingTimesheetList",
        label: "Pending",

        content: <PendingEmployeeTimesheetListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
    {
        id: "declinedTimesheetList",
        label: "Declined",

        content: <DeclinedEmployeeTimesheetListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
   
]

export default employeeTimesheetTabs;