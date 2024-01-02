import SelectOrganization from "../container/wizardFormSteps/MSA/SelectOrganization";
import SuccessMsg from "../container/wizardFormSteps/MSA/SuccessMsg";
// import SuccessMsg from "../container/wizardFormSteps/MSA/SuccessMsg";
import UploadMsaAndDocument from "../container/wizardFormSteps/MSA/UploadMsaAndDocument";
import MultipleResourceWoBlendedRateFirstStep from "../container/wizardFormSteps/WO/MultipleResourceWo/MultipleResourceWoBlendedRate/MultipleResourceWoBlendedRateFirstStep";
import SingleMultipleResourceWo from "../container/wizardFormSteps/WO/SingleMultipleResourceWo";


const AddWoMrSteps = [
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
        component:MultipleResourceWoBlendedRateFirstStep,
        nextStep:''
    }
];

export default AddWoMrSteps;