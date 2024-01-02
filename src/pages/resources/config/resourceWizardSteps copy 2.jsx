import ResourceProfile from '../container/resourceWizardForms/ResourceProfile';
import ResourceAssignDocument from '../container/resourceWizardForms/ResourceAssignDocument';
import ResourceSupplier from '../container/resourceWizardForms/ResourceSupplier';
// import SuccessWarnMsg from '../container/resourceWizardForms/SuccessWarnMsg';
import SuccessMsg from '../container/resourceWizardForms/SuccessMsg';

export const WORKER_W2 = [
    {
        name: '',
        component: ResourceProfile,
        nextStep: 'Assign Documents',
    },
    {
        name: '',
        component: ResourceAssignDocument,
        nextStep: 'Success',
    },
    {
        name: '',
        component: SuccessMsg,
        nextStep: 'Finish',
    },
];

export const WORKER_C2C = [
    {
        name: '',
        component: ResourceProfile,
        nextStep: 'Assign Documents',
    },
    {
        name: '',
        component: ResourceAssignDocument,
        nextStep: 'Supplier',
    },
    {
        name: '',
        component: ResourceSupplier,
        nextStep: 'Success',
    },
    {
        name: '',
        component: SuccessMsg,
        nextStep: 'Finish',
    },
    // {
    //     name: '',
    //     component: SuccessWarnMsg,
    //     nextStep: 'Success',
    // },
];
export const WORKER_1099 = [
    {
        name: '',
        component: ResourceProfile,
        nextStep: 'Assign Documents',
    },
    {
        name: '',
        component: ResourceAssignDocument,
        nextStep: 'Supplier',
    },
    {
        name: '',
        component: ResourceSupplier,
        nextStep: 'Success',
    },
    {
        name: '',
        component: SuccessMsg,
        nextStep: 'Finish',
    },
    // {
    //     name: '',
    //     component: SuccessWarnMsg,
    //     nextStep: '',
    // },
];
