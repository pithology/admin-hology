'use client'
import {useState} from 'react';

export default function Test({apiurl}) {
    const [apiResponse, setApiResponse] = useState(null);
    const [apiResponseStatus, setApiResponseStatus] = useState('success');
    const [loading, setLoading] = useState(false);
    const handleTestApiClick = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiurl}/status`);
            const data = await response.json();
            if (response.ok) {
                setApiResponse(data.message);
                setApiResponseStatus('success');
            } else {
                setApiResponse(data.error);
                setApiResponseStatus('warning');
            }
        } catch (error) {
            console.log(apiurl);
            setApiResponse(`Internal Server Error!`);
            setApiResponseStatus('danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row pt-2">
            <div className="col-12">
                <button
                    className="btn btn-light w-100"
                    type="button"
                    onClick={handleTestApiClick}
                    disabled={loading}
                >Test API Server
                    {loading && (
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    )}
                </button>
            </div>
            <div className="col-12 pt-2">
                {apiResponse && (
                    <div
                        className={`alert alert-${apiResponseStatus} alert-dismissible fade show pt-2`}
                        role="alert"
                    >
                        {apiResponseStatus === 'success' ? (
                            <i className="bi bi-check-circle me-1"></i>
                        ) : apiResponseStatus === 'danger' ? (
                            <i className="bi bi-exclamation-octagon me-1"></i>
                        ) : (
                            <i className="bi bi-exclamation-triangle me-1"></i>
                        )}
                        {apiResponse}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                            onClick={() => {
                                setApiResponse(null);
                                setApiResponseStatus('success');
                            }}
                        ></button>
                    </div>
                )}
            </div>
        </div>
    );
}