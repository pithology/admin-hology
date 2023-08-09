'use client';
import React, {useEffect, useState} from 'react';

export default function QRCodeResultAlert({message}) {
    const [showAlert, setShowAlert] = useState(true);
    const [currentMessage, setCurrentMessage] = useState(message);
    useEffect(() => {
        if (currentMessage !== message) {
            setCurrentMessage(message);
            setShowAlert(true);
        }
    }, [message]);
    useEffect(() => {
        if (showAlert) {
            const timeout = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [showAlert]);

    return (
        showAlert && (
            <div className="alert alert-primary alert-dismissible fade show floating-alert" role="alert">
                <i className="bi bi-star me-1"></i>
                {message}
                <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
            </div>
        )
    );
};
