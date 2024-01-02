import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

const ResourceNotesTab = () => {
    const [textareaValue, setTextareaValue] = useState('');
    const [notes, setNotes] = useState([]);

    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
    };
    const handleAdd = () => {
        if (textareaValue.trim() !== '') {
            const formatDate = (date) => {
                const options = {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                };
                return new Intl.DateTimeFormat('en-US', options).format(date);
            };

            const formatTime = (date) => {
                const options = {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                };
                return new Intl.DateTimeFormat('en-US', options).format(date);
            };
            const now = new Date();
            const formattedTimestamp = `${formatDate(now)} at ${formatTime(now)}`;
            const newNote = {
                id: generateRandomId(),
                note: textareaValue,
                timestamp: formattedTimestamp,
            };
            setNotes([...notes, newNote]);

            setTextareaValue('');
        }
    };

    return (
        <>
            <div>
                <InputTextarea
                    autoResize
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    rows={2}
                    cols={30}
                    placeholder="Enter notes..."
                    className="w-100 h-33 m-1"
                />
                <div className="d-flex justify-content-end align-items-center mt-2">
                    <Button onClick={handleAdd} label="Add" className="company-primary-btn" />
                </div>
            </div>

            {notes
                ?.slice()
                .reverse()
                .map((item, index) => (
                    <div
                        key={index}
                        className="profile_card m-1 d-flex justify-content-start align-items-center gap-1 p-2  "
                    >
                        <div>
                            <Avatar label="P" size="xlarge" shape="circle" />
                        </div>

                        <div>
                            <span className="p-0 mb-0 company-main-text fs-6 fw-bold">Mukesh Koneru</span>{' '}
                            <span className="company-secondary-text">{item.timestamp}</span>
                            <p className="p-0 mb-0 company-main-text">{item.note}</p>
                        </div>
                    </div>
                ))}

            {/* 2 */}
            <div className="profile_card m-1 d-flex justify-content-start align-items-center gap-1 p-2  ">
                <div>
                    <Avatar label="P" size="xlarge" shape="circle" />
                </div>

                <div>
                    <span className="p-0 mb-0 company-main-text fs-6 fw-bold">Mukesh Koneru</span>{' '}
                    <span className="company-secondary-text">Jun-25 2021 at 17.13</span>
                    <p className="p-0 mb-0 company-main-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quasi quaerat veniam.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ResourceNotesTab;
