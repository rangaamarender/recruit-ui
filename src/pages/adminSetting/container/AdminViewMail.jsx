import React from 'react';
import LucidLogo from '../../../assets/images/RAVES-logo.png';
import { Link } from 'react-router-dom';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';

const AdminViewMail = ({setViewPage }) => {
    return (
        <div>
            <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                <TitleHeaderOnly title="View Mail Template" onClick={() => setViewPage(false)} />
            </div>
            <div className="l-width-90 m-auto p-5 mt-5 border 2px solid black">
                <div className="text-center">
                    <img src={LucidLogo} alt="lucidLogo" />
                </div>
                <div className="mt-4">
                    <h3>Welcome , Welcome!</h3>
                </div>
                <div className="mt-3">
                    <h6>Hello Steven,</h6>
                </div>
                <div className="mt-3">
                    <p>
                        We would Like to thank you for signing up. Our #1 Goal is to help you get the most out of LUCID
                        RAVES, so you can stay ahead of the curve.
                    </p>
                </div>
                <div>
                    <p>
                        With <Link to="/recruit">access of our RAVES,</Link> You can enjoy discovering best-in-class UX
                        and UI design patterns in our app library.
                    </p>
                </div>
                <div>
                    <p>If you have any questions, hit reply.</p>
                </div>
                <div className="mt-5">
                    <h6>Thank You,</h6>
                    <h6>LUCID RAVES TEAM</h6>
                </div>
            </div>
        </div>
    );
};

export default AdminViewMail;
