import React from 'react';
import Graph from '../../components/Graph';
import ResourcePromotionCard from './ResourcePromotionCard';

const ResourceGraphsTab = () => {
    return (
        <div>
            <div className="flex w-full">
                <div className="w-8">
                    <Graph />
                </div>
                <div className="w-4">
                    <ResourcePromotionCard />
                </div>
            </div>
        </div>
    );
};

export default ResourceGraphsTab;
