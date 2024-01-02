import React from 'react';

import LoginLayout from '../components/layouts/LoginLayout';
import LoginForm from '../components/login/LoginForm';
const LoginPage = () => {
    return <LoginLayout rightContent={<LoginForm />} />;
};

export default LoginPage;
