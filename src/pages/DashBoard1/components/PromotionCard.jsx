import { CCard, CCardBody, CCardText } from '@coreui/react';
import { Chart } from 'primereact/chart';
import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const PromotionCard = (prop) => {
    const promotionCardData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Promotion Data',
                data: [12, 7, 18, 22, 13, 12, 9, 17],
                borderColor: '#1c80cf',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const promotionCardOptions = {
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
        <>
            <CCard className="custom-card p-3">
                <CCardText className="fs-5 fw-bold">{prop.heading} </CCardText>
                <CCardBody>
                    <div className="flex flex-column justify-content-center align-items-center">
                        <FiAlertTriangle color="red" size="2rem" />
                        <div className="font-bold text-4xl pt-3"> {prop.promotionNumber}</div>
                        <div className="text-500">Promotion Expiring</div>
                        <div className="text-500"> ({prop.expiringDays} Days)</div>
                        <div className="text-center " style={{ width: '200px', height: 'auto' }}>
                            <Chart type="line" data={promotionCardData} options={promotionCardOptions} />
                            {/* chart data are static data */}
                        </div>
                    </div>
                </CCardBody>
            </CCard>
        </>
    );
};

export default PromotionCard;
