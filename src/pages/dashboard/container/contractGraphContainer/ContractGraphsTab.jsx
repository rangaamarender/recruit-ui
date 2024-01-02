import React from 'react';
import Graph from '../../components/Graph';
import ContractPromotionCard from './ContractPromotionCard';

const ContractGraphsTab = () => {
    return (
        <div>
            <div className="flex w-full">
                <div className="w-8">
                    <Graph />
                </div>
                <div className="w-4">
                    <ContractPromotionCard />
                </div>
            </div>
        </div>
    );
};

export default ContractGraphsTab;
