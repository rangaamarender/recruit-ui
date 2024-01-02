import { Chart } from 'primereact/chart';
import { FiAlertTriangle } from 'react-icons/fi';

const ResourcePromotionCard = () => {
    const data1 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Promotion Data',
                data: [3, 5, 7, 10, 5, 7, 4],
                borderColor: '#ff6600',
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
                <div className="font-bold text-4xl pt-3">30</div>
                <div className="text-500">Promotions Expiring</div>
                <div className="text-500">(20 Days)</div>
                <div className="text-center mt-2" style={{ width: '200px', height: 'auto' }}>
                    <Chart type="line" data={data1} options={options1} />
                    {/* <Chart type="line" data={data2} options={options2} /> */}
                </div>
            </div>
        </div>
    );
};

export default ResourcePromotionCard;
