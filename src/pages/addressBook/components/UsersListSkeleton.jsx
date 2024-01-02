import { Skeleton } from 'primereact/skeleton';
import React from 'react';

const  UsersListSkeleton = () => {
    return (
        <>
            <div className=" company-layout-bg  border-end  company-layout-bg mt-4 ">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div className="flex mb-3 p-2" key={index}>
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>

                        <div style={{ flex: '1' }}>
                            <Skeleton width="100%" className="mb-2"></Skeleton>
                            <Skeleton width="75%" className="mb-2"></Skeleton>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UsersListSkeleton;
