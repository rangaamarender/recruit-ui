import { Skeleton } from 'primereact/skeleton';
import React from 'react';

const UsersDetailsSkeleton = () => {
    return (
        <>
            <div className="p-4">
                <div className=" flex justify-content-between align-items-start gap-3 border-bottom p-1">
                    <div className=" flex justify-content-start align-items-center gap-2">
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>

                        <div>
                            <p className="company-main-text p-0 fs-6 fw-bold mb-0">
                                <Skeleton width="100%" className="mb-2"></Skeleton>
                            </p>

                            <Skeleton width="10rem" className="mb-2"></Skeleton>

                            <Skeleton width="4rem" height="2rem"></Skeleton>
                        </div>
                    </div>

                    <Skeleton width="5rem" className="mb-2"></Skeleton>
                </div>
                <Skeleton width="100%" height="150px" className="mt-8"></Skeleton>
            </div>
        </>
    );
};

export default UsersDetailsSkeleton;
