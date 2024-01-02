import React, { useEffect} from 'react'
import PlainLayout from '../../../components/layouts/PlainLayout'
import TabMenuContainer from '../../../components/tabmenu/TabMenuContainer'
import { useDispatch} from 'react-redux';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import payrollTabs from './config/payrollTabs';

function EmployeePayroll() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentPageName('Payroll'));
    }, [dispatch])


    return (
        <PlainLayout>
          
            <TabMenuContainer
                tabItems={payrollTabs}
                actionButtons={[]}
            />

        </PlainLayout>
    )
}

export default EmployeePayroll