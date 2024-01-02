import PlainLayout from '../../components/layouts/PlainLayout';
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';

const ChatsPage = () => {
    const [newMessage, setNewMessage] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageName('Chat'));
    }, [dispatch]);

    return (
        <PlainLayout>
            <div className="row" style={{ height: '78vh' }}>
                <div className="col-3"></div>
                <div className="col-9 border-start">
                    <div
                        className="container w-100"
                        style={{ height: '78vh', display: 'flex', flexDirection: 'column' }}
                    >
                        <div className="fw-bold fs-5 flex  align-items-center justify-content-center flex-column">
                            <div>You're starting a new conversation</div>

                            <div className="fw-normal fs-6">Type your first message below.</div>
                        </div>
                        <div className="chat-window" style={{ flex: 1, overflowY: 'auto' }}>
                            {/* {renderMessages()} */}
                        </div>

                        <div className="chat-input d-flex align-items-center p-3" style={{ background: '#f0f0f0' }}>
                            <InputText
                                className="flex-grow-1 mr-3"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message"
                            />
                            <Button label="Send" className="btn-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </PlainLayout>
    );
};

export default ChatsPage;
