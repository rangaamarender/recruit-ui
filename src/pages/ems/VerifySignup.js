import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifySignup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { pathname } = window.location;
        const myToken = pathname.split('/');
        const final = myToken[myToken.length - 1];
        axios
            .get(`http://20.42.92.222/submgt-0.0.1-SNAPSHOT/api/v1/verifySignup/${final}`)
            .then((res) => {
                navigate('/recruit/register', {
                    state: { verified: true, email: res.data.emailID, company: res.data.companyName, tracker: res.data.trackerCode },
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                if (error.response && error.response.status === 400) {
                    navigate('/recruit/invalid-link');
                } else {
                    navigate('/recruit/invalid-link');
                }
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return;
};

export default VerifySignup;
