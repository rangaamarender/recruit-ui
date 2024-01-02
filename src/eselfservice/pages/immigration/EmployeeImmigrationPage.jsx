import React, { useEffect } from 'react';
import PlainLayout from '../../../components/layouts/PlainLayout';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import WorkPermit from './container/WorkPermit';
import { useState } from 'react';
import Passport from './container/Passport';
import Status from './container/Status';

function EmployeeImmigrationPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageName('Immigration'));
    }, [dispatch]);

    const [active, setActive] = useState("all")

    return (
        <PlainLayout>
            <>
                <div>
                    <h4>Immigration Overview</h4>
                    <hr />
                </div>
                {(active === 'all' || active === 'editWorkPermitDetails') &&
                    <WorkPermit setActive={setActive} active={active} />}
                {(active === 'all' || active === 'editPassportDetails') &&
                    <Passport setActive={setActive} active={active} />}
                {(active === 'all' || active === 'editAddress') &&
                    <Status setActive={setActive} active={active} />}





            


            </>
        </PlainLayout>
    );
}

export default EmployeeImmigrationPage