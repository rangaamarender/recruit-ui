// ErrorBoundary.js
import React, { Component } from 'react';
import GenericErrorPage from '../components/error/GenericErrorPage';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorCode: null,
        errorMessage: null,
        additionalContext: null,
    };

    static getDerivedStateFromError(error) {
        // Update state with error information
        return {
            hasError: true,
            errorCode: error.code || 'N/A',
            errorMessage: error.message || 'An error occurred.',
            additionalContext: error.context || null,
        };
    }

    render() {
        const { hasError, errorCode, errorMessage, additionalContext } = this.state;

        if (hasError) {
            // Render the generic error page
            return (
                <GenericErrorPage
                    errorCode={errorCode}
                    errorMessage={errorMessage}
                    additionalContext={additionalContext}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
