import React from 'react';
import { Button } from 'primereact/button';
import ErrorImg from '../../assets/images/error.png';
import RavesLogo from '../../assets/images/raves@2x.png';

const InvalidLink = () => {

    return (
        <div className="my-font h-screen surface-200">
            <div className="flex justify-content-center">
                <img style={{ marginTop: '5vh' }} src={RavesLogo} alt='raves'/>
            </div>
            <div className="flex justify-content-center" style={{ height: '75vh' }}>
                <div className="flex flex-column justify-content-center align-items-center">
                    <img className="h-15rem" src={ErrorImg} alt='invalid-link'/>
                    <div className="text-4xl font-bold">Link Expired!</div>
                    <div className="text-600 text-center text-sm mb-4">
                        Hey, it looks like your account activation might be pending, or it could already be active.
                        <br />
                        No need to worry - should you required it, you can always reuest a ne link.
                    </div>
                    <div>
                        <Button label="Request" className="border-round-3xl px-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvalidLink;
