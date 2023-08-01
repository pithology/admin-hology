'use client';
import React, { useEffect, useState } from 'react';

export default function  QRCodeResultAlert  ({ result }) {
    const [showAlert, setShowAlert] = useState(true);

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
                Hasil pemindaian QR code: {result}
                <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
            </div>
        )
    );
};
