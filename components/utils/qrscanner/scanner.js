'use client';
import React, {useEffect, useRef, useState} from 'react';
import jsQR from 'jsqr';
import QRCodeResultAlert from "@/components/utils/qrscanner/qrcode";
import {useRouter} from "next/navigation";

export default function QRCodeScanner({apiurl}) {
    const videoRef = useRef(null);
    const [scannedData, setScannedData] = useState('');
    const router = useRouter();
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setToken(JSON.parse(userToken));
        }
    }, []);
    useEffect(() => {
        if (token) {
            fetchData().then();
        }
    }, [scannedData]);
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

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/seminar/checkin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({"ticket_uuid": scannedData}),
            });
            if (response.status === 403 || response.status === 401) {
                localStorage.clear();
                router.push('/401');
            }
            const data = await response.json();
            if (response.ok || response.status === 404) {
                setMessage(data.message || data.error)
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        }
    };

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
            {scannedData && <QRCodeResultAlert message={message}/>}
        </>
    );
}



