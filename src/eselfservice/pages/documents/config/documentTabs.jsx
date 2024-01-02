import ActiveDocumentsListTab from "../components/ActiveDocumentsListTab";
import ExpiredDocumentsListTab from "../components/ExpiredDocumentsListTab";
import SharedDocumentListTab from "../components/SharedDocumentListTab";

const documentTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "ActiveDocumentsListTab",
        label: "Active",

        content: <ActiveDocumentsListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
   
    {
        id: "SharedDocumentListTab",
        label: "Shared",

        content: <SharedDocumentListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
   
    {
        id: "ExpiredDocumentsListTab",
        label: "Expired",

        content: <ExpiredDocumentsListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    }
   
   
   
]

export default documentTabs;