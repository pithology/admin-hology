"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function ManualCheckIn({apiurl}) {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [uuid, setUuid] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setToken(JSON.parse(userToken));
        }
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${apiurl}/seminar/checkin`, {
                method: "POST", headers: {
                    "Content-Type": "application/json", "Authorization": token,
                }, body: JSON.stringify({"ticket_uuid": uuid}),
            });
            if (response.status === 403 || response.status === 401) {
                localStorage.clear();
                router.push('/401');
            }
            const data = await response.json();
            if (response.ok || response.status === 404) {
                setMessage(data.message || data.error);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        } finally {
            setLoading(false);
        }
    };
    return (<>
        <div className="col-12">
            <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="col-12 pt-1">
                    <label htmlFor="yourUUID" className="form-label">
                        <h6>Scanner Error? Try enter your UUID.</h6>
                    </label>
                    <div className="input-group has-validation">
                        <input
                            type="text"
                            name="uuid"
                            className="form-control"
                            id="yourUUID"
                            required
                            value={uuid}
                            onChange={(e) => setUuid(e.target.value)}
                        />
                        <div className="invalid-feedback">Please enter your uuid.
                        </div>
                    </div>
                </div>
                <div className="col-12 d-grid gap-2 mt-3">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? (<><span className="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span> Loading...</>) : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
        {showAlert && (<div className="alert alert-primary alert-dismissible fade show floating-alert" role="alert">
            <i className="bi bi-star me-1"></i>
            {message}
            <button
                type="button"
                className="btn-close"
                onClick={() => setShowAlert(false)}
            ></button>
        </div>)}
    </>)
}