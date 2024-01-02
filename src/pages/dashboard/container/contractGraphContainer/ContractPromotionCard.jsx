import { Chart } from 'primereact/chart';
import { FiAlertTriangle } from 'react-icons/fi';

const ContractPromotionCard = () => {
    const data1 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Promotion Data',
                data: [12, 7, 18, 22, 13, 12, 9, 17],
                borderColor: '#4baaf5',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options1 = {
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div>
            <div className="flex flex-column justify-content-center align-items-center border-start m-1">
                <FiAlertTriangle color="red" size="2rem" />
                <div className="font-bold text-4xl pt-3">48</div>
                <div className="text-500">ContarctPromotionCard Expiring</div>
                <div className="text-500">(30 Days)</div>
                <div className="text-center mt-2" style={{ width: '200px', height: 'auto' }}>
                    <Chart type="line" data={data1} options={options1} />
                    {/* <Chart type="line" data={data2} options={options2} /> */}
                </div>
            </div>
        </div>
    );
};

export default ContractPromotionCard;
