import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './titleHeader.css';
import { Button } from 'primereact/button';

const TitleHeader = ({ onClick, title, nextStep, progress }) => {
    return (
        <>
            <div className="custom-header  p-2 ">
                <div className="left ml-2 pt-2 ">
                    {/* Content on the left side */}
                    <h5 className="fw-bold">{title}</h5>
                </div>
                <div className="right">
                    <div>
                        <div className=" nextLabelText">Next:</div>
                        <div className="nextLabelValue">{nextStep}</div>
                    </div>

                    <div className="d-flex  justify-content-center align-items-center gap-3">
                        <CircularProgressbar
                            value={progress}
                            strokeWidth={8}
                            text={progress === 100 ? 'Done' : `${progress}%`}
                            className="fw-bold circularProgressBar"
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                pathColor: '#5A5F7A',
                                textColor: '#5A5F7A',
                                trailColor: '#ddd',
                                textSize: '20px',
                            })}
                        />
                        <div className="d-flex gap-2">
                            <div className="customDivider"></div>
                            <Button icon="pi pi-times" rounded onClick={onClick} style={{ width: '30px', height: '30px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TitleHeader;
