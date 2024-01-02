import ResourceProfile from '../container/resourceWizardForms/ResourceProfile';
import ResourceAssignDocument from '../container/resourceWizardForms/ResourceAssignDocument';
import ResourceSupplier from '../container/resourceWizardForms/ResourceSupplier';
import SuccessWarnMsg from '../container/resourceWizardForms/SuccessWarnMsg';
// import SuccessMsg from '../container/resourceWizardForms/SuccessMsg';

export const W2 = [
    {
        name: 'Resource',
        component: ResourceProfile,
        nextStep: 'Assign Documents',
    },
    {
        name: 'w2 Documents',
        component: ResourceAssignDocument,
        nextStep: 'End',
    },
    {
        component: SuccessWarnMsg,
        nextStep: 'Successmsg',
    },
];

export const C2C  = [
    {
        name: 'c2c',
        component: ResourceProfile,
        nextStep: 'Assign Documents',
    },
    {
        name: 'c2c Documents',
        component: ResourceAssignDocument,
        nextStep: 'End',
    },
    {
        name: 'c2c ',
        component: ResourceSupplier,
        nextStep: 'End',
    },
];

;
