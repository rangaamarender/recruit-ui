// GenericErrorPage.js
import React from 'react';

function GenericErrorPage({ errorCode, errorMessage, additionalContext }) {
    return (
        <div>
            <h1>Oops! An Error Occurred</h1>
            <p>Error Code: {errorCode}</p>
            <p>Error Message: {errorMessage}</p>
            {additionalContext && <p>Additional Context: {additionalContext}</p>}
            <p>Please try again later or contact support.</p>
        </div>
    );
}

export default GenericErrorPage;
