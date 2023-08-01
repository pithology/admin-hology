'use client';
import React, {useEffect, useRef, useState} from 'react';
import jsQR from 'jsqr';
import QRCodeResultAlert from "@/components/utils/qrscanner/qrcode";

export default function QRCodeScanner() {
    const videoRef = useRef(null);
    const [scannedData, setScannedData] = useState('');

    useEffect(() => {
        let videoStream = null;
        const scanQRCode = () => {
            const video = videoRef.current;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (video.readyState !== video.HAVE_ENOUGH_DATA) {
                requestAnimationFrame(scanQRCode);
                return;
            }
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
                setScannedData(code.data);
            }
            requestAnimationFrame(scanQRCode);
        };
        navigator.mediaDevices
            .getUserMedia({video: {facingMode: 'environment'}})
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoStream = stream;
                scanQRCode();
            })
            .catch((error) => console.error('Error accessing camera:', error));
        return () => {
            if (videoStream) {
                videoStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <>
            <div className="col-lg-9">
                <div className="card">
                    <div className="card-body">
                        <div className="qr-code-scanner pt-3">
                            <div className="video-container">
                                <video ref={videoRef} className="video-box" autoPlay playsInline muted/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {scannedData && <QRCodeResultAlert result={scannedData}/>}
        </>
    );
}



