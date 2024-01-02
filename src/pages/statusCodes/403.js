import React from 'react';
import { Button } from 'primereact/button';
import ErrorImg from '../../assets/images/error.png';
import RavesLogo from '../../assets/images/raves@2x.png';

const NoAccess = () => {
    //   const navigate=useNavigate()

    return (
        <div className="my-font h-screen surface-200">
            <div className="flex justify-content-center">
                <img style={{ marginTop: '5vh' }} src={RavesLogo} alt='raves'/>
            </div>
            <div className="flex justify-content-center" style={{ height: '75vh' }}>
                <div className="flex flex-column justify-content-center align-items-center">
                    <img className="h-15rem" src={ErrorImg} alt='403'/>
                    <div className="text-4xl font-bold">We are sorry...</div>
                    <div className="text-600 text-center text-sm mb-4">
                        The page you're trying to access has restricted access.
                        <br />
                        Please refer to your system administrator.
                    </div>
                    <div>
                        <Button label="GO BACK" className="border-round-3xl px-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoAccess;
