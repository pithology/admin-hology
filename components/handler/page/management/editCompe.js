"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function EditCompe({Id, apiurl, name, desc}) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        competition_name: name, competition_desc: desc
    });
    const [showModal, setShowModal] = useState(false);
    const [TitleInvalid, setTitleInvalid] = useState(false);
    const [token, setToken] = useState('');
    const [DescriptionInvalid, setDescriptionInvalid] = useState(false);
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
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setTitleInvalid(false);
        setDescriptionInvalid(false);
        if (formData.competition_name.trim() === "" && formData.competition_desc.trim() === "") {
            setTitleInvalid(true);
            setDescriptionInvalid(true);
            return;
        } else if (formData.competition_name.trim() === "") {
            setTitleInvalid(true);
            return;
        } else if (formData.competition_desc.trim() === "") {
            setDescriptionInvalid(true);
            return;
        }
        try {
            const response = await fetch(`${apiurl}/admin/compe/${Id}`, {
                method: "POST", headers: {
                    "Content-Type": "application/json", "Authorization": token,
                }, body: JSON.stringify({
                    "competition_name": formData.competition_name,
                    "competition_description": formData.competition_desc,
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
        <button type="button" onClick={handleModalShow}
                className="btn btn-outline-primary btn-sm"><span
            className="bi bi-file-earmark-text"> Edit</span></button>
        <div className={`modal fade ${showModal ? "show" : ""}`} id="Modal" tabIndex="-1"
             style={{display: showModal ? "block" : "none"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit admin</h5>
                        <button type="button" className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close" onClick={handleModalClose}></button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="modal-body">
                            <div className="col-12">
                                <label htmlFor="yourTitle"
                                       className="form-label">Name</label>
                                <div className="input-group">
                                    <input type="text" name="competition_name"
                                           className={`form-control ${TitleInvalid ? "is-invalid" : ""}`}
                                           id="yourTitle" value={formData.competition_name}
                                           onChange={handleInputChange}/>
                                    {TitleInvalid && (
                                        <div className="invalid-feedback">Please enter the Name.</div>)}
                                </div>
                            </div>
                            <div className="col-12 pt-3">
                                <label htmlFor="yourDescription"
                                       className="form-label">Description</label>
                                <textarea name="competition_desc"
                                          className={`form-control ${DescriptionInvalid ? "is-invalid" : ""}`}
                                          id="yourDescription"
                                          value={formData.competition_desc}
                                          onChange={handleInputChange}/>
                                {DescriptionInvalid && (
                                    <div className="invalid-feedback">Please enter the description.</div>)}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-secondary" onClick={handleModalClose}>Close
                            </button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>)
}