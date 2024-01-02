import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../errorHandling/ErrorBoundary';
import { I18nProvider, setLocale, setValidationMessages } from '../i18n/i18n';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';

const RouterConfig = () => {
    // Set initial locale and validation messages
    setLocale('en');
    setValidationMessages('en');
    return (
        <div>
            <ErrorBoundary>
                <I18nProvider>
                    <Routes>
                        <Route exact path="/recruit/" element={<LoginPage />} />
                        <Route exact path="/recruit/dashboard" element={<DashboardPage />} />
                    </Routes>
                </I18nProvider>
            </ErrorBoundary>
        </div>
    );
};

export default RouterConfig;
