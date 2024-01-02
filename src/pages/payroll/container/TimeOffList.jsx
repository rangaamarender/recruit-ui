import React from 'react'
import PlainCustomDataTable from '../../../components/datatable/PlainCustomDataTable'
import timeOffSelectedColumn from '../config/timeOffSelectedColumn'
import timeOffColumnConfig from '../config/timeOffColumnConfig'

const TimeOffList = () => {
    const data = [
        {
            name: "Abhishek Pulluri"
        }
    ]
    return (
        <div>
            {/* content1 */}
            <div className='l-width-70 m-auto p-3 d-flex align-items-center justify-content-between border-bottom'>
                <div className=''>
                    <div className='fs-5 fw-bold'>
                        Time Off
                    </div>
                    <div className='p-text-secondary'>
                        Check employee total hours, time off and additional earning
                    </div>
                </div>
            </div>
            {/* DataTable */}
            <div>
                <PlainCustomDataTable
                    data={data}
                    selectedColumns={timeOffSelectedColumn}
                    columnsConfig={timeOffColumnConfig}
                />
            </div>
        </div>
    )
}

export default TimeOffList