import BankDetails from "./BankDetails";
import ContactDetails from "./ContactDetails";
import Dependents from "./Dependents";
import Documents from "./Documents";
import Emergency from "./Emergency";
import UserProfile from "./UserProfile";

export const EmployeeSteps = [
    {
        name: 'User Profile',
        component: UserProfile,
        nextStep: 'Contact Details',
      },
      {
        name: 'Contact Details',
        component: ContactDetails,
        nextStep: 'Documents',
      },
      {
        name: 'Documents',
        component: Documents,
        nextStep: 'Bank Details',
      },
      {
        name: 'Bank Details',
        component: BankDetails,
        nextStep: 'Emergency',
      },
      {
        name: 'Emergency',
        component: Emergency,
        nextStep: 'Dependents',
      },
      {
        name: 'Dependents',
        component: Dependents,
        nextStep: 'Finish',
      },
     

];