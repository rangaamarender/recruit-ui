import ContractsWoCreateFirstStep from "../container/wizardFormSteps/WO/ContractsWoCreateFirstStep";
// import SingleMultipleResourceWo from "../container/wizardFormSteps/WO/SingleMultipleResourceWo";
// import SingleResourceRates from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceRates";
// import SingleResourceRecruiterInfoParent from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceRecruiterInfoParent";
// import SingleResourceUploadSuperVisorInfoClient from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceUploadSuperVisorInfoClient";
// import SingleResourceWoAddOrganization from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAddOrganization";
// // import SingleResourceWoAddress from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAddress";
// import SingleResourceWoAtEndClient from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAtEndClient";
// import SingleResourceWoSupplierInfo from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoSupplierInfo";
// import SingleResourceWoContractSupervisorInfo from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoContractSupervisorInfo";
// import SingleResourceWoUploadWOAndSupportingDocuments from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoUploadWOAndSupportingDocuments";
// import SingleResourceWorkorderRates from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWorkorderRates";
// // import SuccessMsg from "../container/wizardFormSteps/MSA/SuccessMsg";
// import SingleResourceWoSuccessMsg from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoSuccessMsg";
import MultipleResourceWoIndividualRateFirstStep from "../container/wizardFormSteps/WO/MultipleResourceWo/MultipleResourceWoIndividualRate/MultipleResourceWoIndividualRateFirstStep";


const AddWoStepsWoSrSteps = [
    {
        name:'',
        component: ContractsWoCreateFirstStep,
        nextStep:'SingleResourceWorkorderRates',
    },
{
        name:'',
        component: WorkOderModuleSingleMultipleResource,
        nextStep:'SingleResourceWorkorderRates',
    },
            {
                name:'',
                component:MultipleResourceWoIndividualRateFirstStep,
                nextStep:''
            }
];
export default AddWoStepsWoSrSteps;