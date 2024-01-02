import AccountManagerInfoStep from "../container/wizardFormSteps/WO/AccountManagerInfoStep";
import AddWorkorderDetailsStep from "../container/wizardFormSteps/WO/AddWorkorderDetailsStep";
import ContractSupervisorInfoStep from "../container/wizardFormSteps/WO/ContractSupervisorInfoStep";
import SelectMSAStep from "../container/wizardFormSteps/WO/SelectMSAStep";
import WorkorderStep from "../container/wizardFormSteps/WO/WorkorderStep";
import WorkorderTypeStep from "../container/wizardFormSteps/WO/WorkorderTypeStep";

const addContractMSASteps = [
   
    {
        name: 'Supervisor Info (Client)',
        component: ContractSupervisorInfoStep,
        nextStep : 'Work Order'
    },
    {
        name: 'Work Order',
        component: SelectMSAStep,
        nextStep : 'Work Order Type'
    },
    {
        name: 'Work Order Type',
        component: WorkorderTypeStep,
        nextStep : 'MSA'
    },
    {
        name: 'Work Order',
        component: WorkorderStep,
        nextStep : 'MSA'
    },
    {
        name: 'Tenant Account Manager Info',
        component: AccountManagerInfoStep,
        nextStep : 'MSA'
    },
    {
        name: 'Work Order - Rates',
        component: AddWorkorderDetailsStep,
        nextStep : 'MSA'
    },
    
];

export default addContractMSASteps