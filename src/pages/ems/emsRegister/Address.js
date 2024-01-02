import React from 'react';
import ReusableAddress from '../../../components/address/ReusableAddress';

const Address = ({ control, errors, setValue }) => {
    return (
        <div className="mb-3">
            <ReusableAddress control={control} errors={errors} setValue={setValue} />
        </div>
    );
};

export default Address;
