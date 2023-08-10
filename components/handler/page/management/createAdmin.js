"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function CreateAdmin({apiurl}) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        admin_name: '', admin_email: '', admin_role: 'INTI', admin_password: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState('');
    const [NameInvalid, setNameInvalid] = useState(false);
    const [EmailInvalid, setEmailInvalid] = useState(false);
    const [PasswordInvalid, setPasswordInvalid] = useState(false);
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setToken(JSON.parse(userToken));
        } else {
            router.push('/401');
        }
    }, [router]);
    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleModalShow = () => {
        setShowModal(true);
    }
    const formFields = [
        { name: 'admin_name', setInvalid: setNameInvalid },
        { name: 'admin_email', setInvalid: setEmailInvalid },
        { name: 'admin_password', setInvalid: setPasswordInvalid }
    ];
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let hasInvalidField = false;
        formFields.forEach(({ name, setInvalid }) => {
            if (formData[name].trim() === '') {
                setInvalid(true);
                hasInvalidField = true;
            } else {
                setInvalid(false);
            }
        });
        if (hasInvalidField) {
            return;
        }
        try {
            const response = await fetch(`${apiurl}/admin/create`, {
                method: "POST", headers: {
                    "Content-Type": "application/json", "Authorization": token,
                }, body: JSON.stringify({
                    "admin_email": formData.admin_email,
                    "admin_password": formData.admin_password,
                    "admin_name": formData.admin_name,
                    "admin_role": formData.admin_role
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                localStorage.setItem('successMessage', 'Data berhasil disimpan');
                window.location.reload();
            } else if (response.status === 401) {
                localStorage.clear();
                router.push('/401');
            } else if (response.status === 403) {
                if (responseData.message === 'Invalid token') {
                    localStorage.clear();
                    router.push('/401');
                } else {
                    router.push('/403');
                }
            }
        } catch (error) {
            console.log("An error occurred during request.");
        }
        setShowModal(false);
    };
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData, [name]: value,
        }));
    };
    return (<>
        <button type="button" className="btn btn-outline-primary" onClick={handleModalShow}><i
            className="bi bi-person-plus" style={{fontSize: '28px'}}></i>
        </button>
        <div className={`modal fade ${showModal ? "show" : ""}`} id="Modal" tabIndex="-1"
             style={{display: showModal ? "block" : "none"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New Admin</h5>
                        <button type="button" className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close" onClick={handleModalClose}></button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="modal-body">
                            <div className="col-12">
                                <label htmlFor="yourName"
                                       className="form-label">Name</label>
                                <div className="input-group">
                                    <input type="text" name="admin_name"
                                           className={`form-control ${NameInvalid ? "is-invalid" : ""}`}
                                           id="yourName" value={formData.admin_name}
                                           onChange={handleInputChange}/>
                                    {NameInvalid && (<div className="invalid-feedback">Please enter the name.</div>)}
                                </div>
                            </div>
                            <div className="col-12 pt-3">
                                <label htmlFor="yourEmail"
                                       className="form-label">Email</label>
                                <div className="input-group">
                                    <input name="admin_email" type="email"
                                           className={`form-control ${EmailInvalid ? "is-invalid" : ""}`}
                                           id="yourEmail"
                                           value={formData.admin_email}
                                           onChange={handleInputChange}/>
                                    {EmailInvalid && (<div className="invalid-feedback">Please enter the email.</div>)}
                                </div>
                            </div>
                            <div className="col-12 pt-3">
                                <label htmlFor="yourRole"
                                       className="form-label">Role</label>
                                <div className="input-group">
                                    <select className="form-select" aria-label="Default select example"
                                            name="admin_role"
                                            value={formData.admin_role}
                                            disabled={formData.admin_role === 'GOD'}
                                            onChange={handleInputChange}>
                                        <option value="INTI" selected>INTI</option>
                                        <option value="SEKBEN">SEKBEN</option>
                                        <option value="EXHIBITOR">EXHIBITOR</option>
                                        <option value="INSTRUCTOR">INSTRUCTOR</option>
                                        <option value="GOD" hidden>GOD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 pt-3">
                                <label htmlFor="yourPassword"
                                       className="form-label">Password</label>
                                <div className="input-group">
                                    <input name="admin_password" type="password"
                                           className={`form-control ${PasswordInvalid ? "is-invalid" : ""}`}
                                           id="yourPassword"
                                           value={formData.admin_password}
                                           onChange={handleInputChange}/>
                                    {PasswordInvalid && (<div className="invalid-feedback">Please enter the password.</div>)}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-secondary" onClick={handleModalClose}>Close
                            </button>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>)
}