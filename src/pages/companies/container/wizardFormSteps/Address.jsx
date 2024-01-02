import React, { useEffect } from 'react';
import ReusableAddress from '../../../../components/address/ReusableAddress';

function Address({ control, errors, setSkip, setValue }) {

    useEffect(() => {
        setSkip(true)
    })

    return (
        <>
            <div className='mb-5'>
                <ReusableAddress control={control} errors={errors} setValue={setValue} />
            </div>
        </>
    );
}

export default Address;
