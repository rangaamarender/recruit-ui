import ContractTerms from '../container/wizardFormSteps/MSA/ContractTerms';
import SelectOrganization from '../container/wizardFormSteps/MSA/SelectOrganization';
import SuccessMsg from '../container/wizardFormSteps/MSA/SuccessMsg';
import UploadMsaAndDocument from '../container/wizardFormSteps/MSA/UploadMsaAndDocument';
import SingleMultipleResourceWo from '../container/wizardFormSteps/WO/SingleMultipleResourceWo';
// import SingleResourceContractsWoAddress from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceContractsWoAddress";
import SingleResourceRates from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceRates';
import SingleResourceRecruiterInfoParent from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceRecruiterInfoParent';
import SingleResourceUploadSuperVisorInfoClient from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceUploadSuperVisorInfoClient';
import SingleResourceWoAddOrganization from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAddOrganization';
// import SingleResourceWoAddress from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAddress";
import SingleResourceWoAtEndClient from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAtEndClient';
import SingleResourceWoContractSupervisorInfo from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoContractSupervisorInfo';
import SingleResourceWoSuccessMsg from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoSuccessMsg';
import SingleResourceWoSupplierInfo from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoSupplierInfo';
// import SingleResourceWoFirstStep from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoFirstStep";
import SingleResourceWoUploadWOAndSupportingDocuments from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoUploadWOAndSupportingDocuments';
import SingleResourceWorkorderRates from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWorkorderRates';

const AddMsaSteps = [
    {
        name: '',
        component: UploadMsaAndDocument,
        nextStep: 'SingleMultipleResourceSelection',
    },
    {
        name: '',
        component: SelectOrganization,
        nextStep: 'UploadMsaAndDocument',
    },
    {
        name: 'Contract Terms',
        component: ContractTerms,
        nextStep: 'ContractTerms',
    },

    {
        name: '',
        component: UploadMsaAndDocument,
        nextStep: 'SingleMultipleResourceSelection',
    },
    {
        name: '',
        component: SuccessMsg,
        nextStep: 'Completed',
    },
    {
        name: '',
        component: SingleMultipleResourceWo,
        nextStep: 'SingleResourceWorkorderRates',
    },
    {
        name: '',
        component: SingleResourceWorkorderRates,
        nextStep: 'Rates',
    },
    {
        name: '',
        component: SingleResourceRates,
        nextStep: 'WoUploadWO',
    },
    {
        name: '',
        component: SingleResourceWoUploadWOAndSupportingDocuments,
        nextStep: 'AtEndClient',
    },
    {
        name: '',
        component: SingleResourceWoAtEndClient,
        nextStep: 'AddOrganization',
    },
    {
        name: '',
        component: SingleResourceWoAddOrganization,
        nextStep: 'Address',
    },
    {
        name: '',
        component: SingleResourceWoSupplierInfo,
        nextStep: 'Address',
    },
    {
        name: '',
        component: SingleResourceWoSuccessMsg,
        nextStep: 'SupervisorInfo',
    },
    {
        name: '',
        component: SingleResourceWoContractSupervisorInfo,
        nextStep: 'UploadSuperVisor',
    },
    {
        name: '',
        component: SingleResourceUploadSuperVisorInfoClient,
        nextStep: 'SupervisorInfo',
    },
    {
        name: '',
        component: SingleResourceRecruiterInfoParent,
        nextStep: 'Finish',
    },
];

export default AddMsaSteps;
