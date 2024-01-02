import ContractsWoCreateFirstStep from "../container/wizardFormSteps/WO/ContractsWoCreateFirstStep";
// import WorkOderModuleSingleMultipleResource from "../container/wizardFormSteps/WO/WorkOderModuleSingleMultipleResource";
import SingleResourceRates from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceRates";
import SingleResourceRecruiterInfoParent from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceRecruiterInfoParent";
import SingleResourceUploadSuperVisorInfoClient from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceUploadSuperVisorInfoClient";
import SingleResourceWoAddOrganization from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAddOrganization";
// import SingleResourceWoAddress from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAddress";
import SingleResourceWoAtEndClient from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAtEndClient";
import SingleResourceWoSupplierInfo from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoSupplierInfo";
import SingleResourceWoContractSupervisorInfo from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoContractSupervisorInfo";
import SingleResourceWoUploadWOAndSupportingDocuments from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoUploadWOAndSupportingDocuments";
import SingleResourceWorkorderRates from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWorkorderRates";
// import SuccessMsg from "../container/wizardFormSteps/MSA/SuccessMsg";
import SingleResourceWoSuccessMsg from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoSuccessMsg";
import WorkOderModuleSingleMultipleResource from '../container/wizardFormSteps/WorkOderModuleSingleMultipleResource';

const AddWoSteps = [
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
                component: SingleResourceWorkorderRates,
                nextStep:'Rates',
            },
            {
                name:'',
                component: SingleResourceRates,
                nextStep:'WoUploadWO',
            },
            {
                name:'',
                component: SingleResourceWoUploadWOAndSupportingDocuments,
                nextStep:'AtEndClient',
            },
            {
                name:'',
                component: SingleResourceWoAtEndClient,
                nextStep:'AddOrganization',
            },
            {
                name:'',
                component: SingleResourceWoAddOrganization,
                nextStep:'SupplierInfo',
            },
            {
                name:'',
                component: SingleResourceWoSupplierInfo,
                nextStep:'SupervisorInfo',
            },
            {
                name:'',
                component: SingleResourceWoSuccessMsg,
                nextStep:'RecruiterInfoParent',
            },
            {
                name:'',
                component: SingleResourceWoContractSupervisorInfo,
                nextStep:'UploadSuperVisor',
            },
            {
                name:'',
                component: SingleResourceUploadSuperVisorInfoClient,
                nextStep:'RecruiterInfo',
            },
            {
                name:'',
                component: SingleResourceRecruiterInfoParent,
                nextStep:'Finish',
            },
            // {
            //     name:'',
            //     component: SingleResourceWoContractSupervisorInfo,
            //     nextStep:'UploadSuperVisor',
            // },
            // {
            //     name:'',
            //     component: SingleResourceUploadSuperVisorInfoClient,
            //     nextStep:'Finish',
            // }
];
export default AddWoSteps;