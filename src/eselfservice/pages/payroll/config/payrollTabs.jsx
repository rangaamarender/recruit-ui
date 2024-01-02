import EarningsDuductions from "../components/EarningsDuductions";
import PayProfileTab from "../components/PayProfileTab";
import TaxInformation from "../components/TaxInformation";

const payrollTabs = [
    {
        id: "PayProfileTab",
        label: "Pay Profile",

        content: <PayProfileTab/>
    },
    {
        id: "taxInformationTab",
        label: "Tax Information",

        content: <TaxInformation/>
    },
    {
        id: "earningsDeductionsTab",
        label: "Earnings & Deductions",

        content: <EarningsDuductions/>
    },
   
]

export default payrollTabs;