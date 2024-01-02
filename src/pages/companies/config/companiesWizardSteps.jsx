import Address from "./../container/wizardFormSteps/Address"
import CompaniesAddUsersStep from "./../container/wizardFormSteps/CompaniesAddUsersStep"
// import CompanyContactDetailsStep from "./../container/wizardFormSteps/CompanyContactDetailsStep"
import CompanyProfileStep from "./../container/wizardFormSteps/CompanyProfileStep"
import Documents from "./../container/wizardFormSteps/Documents"

const companiesWizardSteps = [
    {
        id: 'companyProfile',
        name: '',
        component: CompanyProfileStep,
        nextStep: "Contact Details",
    },
    // {
    //     id: 'contactDetails',
    //     name: '',
    //     component: CompanyContactDetailsStep,
    //     nextStep: "Address",
    // },
    {
        id: 'address',
        name: '',
        component: Address,
        nextStep: "Documents",
    },
    {
        id: 'documents',
        name: '',
        component: Documents,
        nextStep: "Add Users",
    },
    {
        id: 'addUsers',
        name: '',
        component: CompaniesAddUsersStep,
        nextStep: "End",
    },
];

export default companiesWizardSteps;
