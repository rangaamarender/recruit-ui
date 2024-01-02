import CreateUser from './CreateUser';

export const userWizardSteps = [
    {
        id: 'userProfile',
        name: '',
        component: CreateUser,
        nextStep: 'end',
    },
];
