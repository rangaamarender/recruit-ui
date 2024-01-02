import SelectOrganization from "../container/wizardFormSteps/MSA/SelectOrganization";
import SuccessMsg from "../container/wizardFormSteps/MSA/SuccessMsg";
import UploadMsaAndDocument from "../container/wizardFormSteps/MSA/UploadMsaAndDocument";
import MultipleResourceWoIndividualRateFirstStep from "../container/wizardFormSteps/WO/MultipleResourceWo/MultipleResourceWoIndividualRate/MultipleResourceWoIndividualRateFirstStep";
import SingleMultipleResourceWo from "../container/wizardFormSteps/WO/SingleMultipleResourceWo";


const AddWoSrSteps = [
    {
        name: '',
        component: SelectOrganization,
        nextStep : 'UploadMsaAndDocument'
    },
    {
        name: '',
        component: UploadMsaAndDocument,
        nextStep : 'SuccessMsg'
    },
    {
        name:'',
        component: SuccessMsg,
        nextStep:'Completed',
    },
    {
        name:'',
        component: SingleMultipleResourceWo,
        nextStep:'Completed',
    },
    {
        name:'',
        component:MultipleResourceWoIndividualRateFirstStep,
        nextStep:''
    }
];

export default AddWoSrSteps;