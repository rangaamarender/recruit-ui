import { InputText } from 'primereact/inputtext';
const nameTemp = (rowData) => (
    <div>
        <div>{rowData.name}</div>
        <div className='fw-normal'>FTE - $82,000/Year</div>
    </div>
);

const paidTimeOff = () => (
    <div>
        <div className="p-inputgroup">
            <InputText className="" />
            <span className="p-inputgroup-addon">hrs</span>
        </div>
        <div>
            60 hrs remaining
        </div>
    </div>
)

const sickLeave = () => (
    <div>
        <div className="p-inputgroup">
            <InputText className="" />
            <span className="p-inputgroup-addon">hrs</span>
        </div>
        <div>
            50 hrs remaining
        </div>
    </div>
)

const paidHoliday = () => (
    <div>
        <div className="p-inputgroup">
            <InputText className="" />
            <span className="p-inputgroup-addon">hrs</span>
        </div>
        <div>
            60 hrs remaining
        </div>
    </div>
)


const timeOffColumnConfig = [
    {
        field: "name",
        header: "Name",
        body: nameTemp
    },
    {
        field: "paidTimeOff",
        header: "Paid Timeoff",
        body: paidTimeOff
    },
    {
        field: "paidHoliday",
        header: "Paid Holiday",
        body: paidHoliday
    },
    {
        field: "sickLeave",
        header: "Sick Leave",
        body : sickLeave
    }
]

export default timeOffColumnConfig;