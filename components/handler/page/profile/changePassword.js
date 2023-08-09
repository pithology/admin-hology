"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function ChangePasswordForm({apiurl}) {
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(true);
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [renewPassword, setRenewPassword] = useState('');
    const [message, setMessage] = useState('Please remember your new password. Once changed, you cannot roll back to the previous password.');
    const handleAlertClose = () => {
        setShowAlert(false);
    };
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setToken(JSON.parse(userToken));
        }
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!password || !newPassword || !renewPassword) {
            setMessage("Please fill in all password fields.");
            setShowAlert(true);
            return;
        }
        if (newPassword !== renewPassword) {
            setMessage("New password and re-entered password do not match.");
            setShowAlert(true);
            return;
        }
        try {
            const response = await fetch(`${apiurl}/changePassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({"password": password, "new_password": newPassword}),
            });
            if (response.status === 403 || response.status === 401) {
                localStorage.clear();
                router.push('/401');
            }
            const data = await response.json();
            if (response.ok || response.status === 404) {
                setMessage(data.message || data.error);
                setShowAlert(true);
            }
        } catch (error) {
            setMessage('Error fetching data from API');
        }
    };
    return (
        <div className="col-xl-8">
            <div className="card">
                <div className="card-body tab-pane pt-4" id="profile-change-password">
                    <h3>Change Password</h3>
                    {showAlert && (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            {message}
                            <button type="button" className="btn-close" onClick={handleAlertClose}
                                    aria-label="Close"></button>
                        </div>
                    )}
                    <form className="row needs-validation" onSubmit={handleSubmit} noValidate>
                        <div className="row mb-3">
                            <label htmlFor="currentPassword"
                                   className="col-md-4 col-lg-3 col-form-label">Current
                                Password</label>
                            <div className="col-md-8 col-lg-9 input-group has-validation">
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    id="currentPassword"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">Please enter your current password!</div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="newPassword"
                                   className="col-md-4 col-lg-3 col-form-label">New
                                Password</label>
                            <div className="col-md-8 col-lg-9 input-group has-validation">
                                <input
                                    name="new_password"
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">Please enter your new password!</div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="renewPassword"
                                   className="col-md-4 col-lg-3 col-form-label">Re-enter New
                                Password</label>
                            <div className="col-md-8 col-lg-9 input-group has-validation">
                                <input
                                    name="renew_password"
                                    type="password"
                                    className="form-control"
                                    id="renewPassword"
                                    value={renewPassword}
                                    onChange={(e) => setRenewPassword(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">Please re-enter your new-password!</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}