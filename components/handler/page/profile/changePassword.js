"use client";
import {useState} from "react";

export default function ChangePasswordForm() {
    const [showAlert, setShowAlert] = useState(true);
    const handleAlertClose = () => {
        setShowAlert(false);
    };
    return (
        <div className="col-xl-8">
            <div className="card">
                <div className="card-body tab-pane pt-4" id="profile-change-password">
                    <h3>Change Password</h3>
                    {showAlert && (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            Please remember your new password. <br/>Once changed, you cannot roll back to the previous
                            password.
                            <button type="button" className="btn-close" onClick={handleAlertClose}
                                    aria-label="Close"></button>
                        </div>
                    )}
                    <form className="row needs-validation" noValidate>
                        <div className="row mb-3">
                            <label htmlFor="currentPassword"
                                   className="col-md-4 col-lg-3 col-form-label">Current
                                Password</label>
                            <div className="col-md-8 col-lg-9 input-group has-validation">
                                <input name="password" type="password" className="form-control"
                                       id="currentPassword" required/>
                                <div className="invalid-feedback">Please enter your current password!</div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="newPassword"
                                   className="col-md-4 col-lg-3 col-form-label">New
                                Password</label>
                            <div className="col-md-8 col-lg-9 input-group has-validation">
                                <input name="newpassword" type="password"
                                       className="form-control" id="newPassword" required/>
                                <div className="invalid-feedback">Please enter your new password!</div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="renewPassword"
                                   className="col-md-4 col-lg-3 col-form-label">Re-enter New
                                Password</label>
                            <div className="col-md-8 col-lg-9 input-group has-validation">
                                <input name="renewpassword" type="password"
                                       className="form-control" id="renewPassword" required/>
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