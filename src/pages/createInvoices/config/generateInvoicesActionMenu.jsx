// import CreateInvoiceStep from "../container/wizardFormSteps/CreateInvoiceStep";

const generateInvoicesActionMenu = [
    {
        label: <p className="company-main-text p-2 fs-6 fw-bold m-1  w-auto">View Status</p>,
        action: 'viewInvoice',
        // component: <CreateInvoiceStep />
    },
    {
        label: <p className="company-main-text p-2 fs-6 fw-bold m-1  w-auto">Create Invoice</p>,
        action: 'createInvoice',
        // component: <CreateInvoiceStep />
    },
];

export default generateInvoicesActionMenu;
