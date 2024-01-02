import React from 'react';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

const ActionBar = ({ actionButtons }) => {
    return (
        <div className="other-actions p-1">
            {actionButtons.map((button, index) => (
                <Button
                    key={index}
                    label={button.label}
                    icon={button.icon}
                    onClick={button.actionHandler}
                    severity={button.severity}
                    size="small"
                />
            ))}
        </div>
    );
};

ActionBar.propTypes = {
    actionButtons: PropTypes.array.isRequired,
};

export default ActionBar;
