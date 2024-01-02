import PayStubsListTab from "../components/PayStubsListTab";

const payTabs = ({ columnConfig, handleFilterClick }) => [
    {
        id: "PayStubsListTab",
        label: "Paystubs",

        content: <PayStubsListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}

        />
    },
   
    // {
    //     id: "PayProfileListTab",
    //     label: "Pay Profile(PO)",

    //     content: <PayProfileListTab
    //         columnConfig={columnConfig}
    //         handleFilterClick={handleFilterClick}

    //     />
    // }
   
   
   
]

export default payTabs;