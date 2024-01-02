import CreateInvoiceStep from "../container/wizardFormSteps/CreateInvoiceStep";

const createInvoicesWizardSteps = [
    {
        id: 'createInvoice',
        name: 'Create Invoice',
        component: CreateInvoiceStep,
        nextStep: " ",
    },
];

export default createInvoicesWizardSteps;
