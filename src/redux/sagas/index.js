// sagas/index.js
import { all } from 'redux-saga/effects';
import { watchLoginUser } from './authSaga';
import msgTemplateSaga from './msgTemplateSaga';
import signupSaga from './signupSaga';
import timesheetSaga from './timesheetSaga';
import contractSaga from './contractSaga';
import companiesSaga from './companiesSaga';
import payrollSaga from './payrollSaga';
import resourcesSaga from './resourcesSaga';
import addressBookSaga from './addressBookSaga';
import adminResourceRoleSaga from './adminResourceRoleSaga';
import registerSaga from './registerSaga';
import paymentSaga from './paymentSaga';
import adminSettingsSaga from './adminSettingsSaga';
import workOrderSaga from './workOrderSaga';
import headerTitleSaga from './headerTitleSaga';

function* rootSaga() {
    yield all([
        watchLoginUser(),
        msgTemplateSaga(),
        signupSaga(),
        timesheetSaga(),
        contractSaga(),
        companiesSaga(),
        payrollSaga(),
        resourcesSaga(),
        addressBookSaga(),
        adminResourceRoleSaga(),
        registerSaga(),
        paymentSaga(),
        adminSettingsSaga(),
        workOrderSaga(),
        headerTitleSaga()
        // Add other sagas here
    ]);
}

export default rootSaga;
