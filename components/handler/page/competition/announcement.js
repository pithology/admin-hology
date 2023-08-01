"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import apiurl from "@/components/utils/api";

export default function Announcement({teamId}) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
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
        if (formData.title.trim() === "" && formData.description.trim() === "") {
            setTitleInvalid(true);
            setDescriptionInvalid(true);
            return;
        } else if (formData.title.trim() === "") {
            setTitleInvalid(true);
            return;
        } else if (formData.description.trim() === "") {
            setDescriptionInvalid(true);
            return;
        }
        try {
            const response = await fetch(`${apiurl}/competition/announcement/${teamId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({"judul": formData.title, "deskripsi": formData.description}),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('successMessage', 'Pengumaman berhasil disimpan');
                window.location.reload();
            } else if (response.status === 403 || response.status === 401) {
                localStorage.clear();
                router.push('/401');
            }
        } catch (error) {
            console.log("An error occurred during request.");
        }
        setShowModal(false);
    };
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    return (
        <div className="d-grid gap-2 mt-3">
            <button className="btn btn-light" type="button" onClick={handleModalShow}>Replace
            </button>
            <div className={`modal fade ${showModal ? "show" : ""}`} id="Modal" tabIndex="-1"
                 style={{display: showModal ? "block" : "none"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Announcement</h5>
                            <button type="button" className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close" onClick={handleModalClose}></button>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="modal-body">
                                <div className="col-12">
                                    <label htmlFor="yourTitle"
                                           className="form-label">Title</label>
                                    <div className="input-group">
                                        <input type="text" name="title"
                                               className={`form-control ${TitleInvalid ? "is-invalid" : ""}`}
                                               id="yourTitle" value={formData.title}
                                               onChange={handleInputChange}/>
                                        {TitleInvalid && (
                                            <div className="invalid-feedback">Please enter the title.</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12 pt-3">
                                    <label htmlFor="yourDescription"
                                           className="form-label">Description</label>
                                    <textarea name="description"
                                              className={`form-control ${DescriptionInvalid ? "is-invalid" : ""}`}
                                              id="yourDescription"
                                              value={formData.description}
                                              onChange={handleInputChange}/>
                                    {DescriptionInvalid && (
                                        <div className="invalid-feedback">Please enter the description.</div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}