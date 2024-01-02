import HoursStatusTableView from "../container/viewTabSteps/HoursStatusTableView";
import CreateInvoiceStep from "../container/wizardFormSteps/CreateInvoiceStep";

const handleGenerateInvoicesAction = (action, rowData) => {
    switch (action) {
        case 'viewInvoice':
            // Implement view action logic
            console.log('Viewing:');
            return <HoursStatusTableView rowData={rowData} />
        case 'createInvoice':
            // Implement edit action logic
            console.log('createInvoice:');
            return <CreateInvoiceStep />
        default:
            break;
    }
};
export default handleGenerateInvoicesAction;
