import ActiveTimesheetListTab from "../components/ActiveTimesheetListTab";
import InactiveTimesheetListTab from "../components/InactiveTimesheetListTab";

const timesheetTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "activeTimesheetList",
        label: "Active",

        content: <ActiveTimesheetListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
    {
        id: "inactiveTimesheetList",
        label: "Inactive",

        content: <InactiveTimesheetListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
        />
    }
]

export default timesheetTabs;