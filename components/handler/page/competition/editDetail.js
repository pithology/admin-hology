"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function EditDetail({status, phase, teamId, nameTeam, apiurl}) {
    const router = useRouter();
    const [statuses, setStatus] = useState(status);
    const [phases, setPhase] = useState(phase);
    const [token, setToken] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setToken(JSON.parse(userToken));
        } else {
            router.push('/401');
        }
    }, [router]);
    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiurl}/competition/statusphase/${teamId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({"status": statuses, "phase": phases}),
            });
            if (response.ok) {
                await response.json();
                localStorage.setItem('successMessage', 'Data berhasil disimpan');
                window.location.reload();
            } else if (response.status === 403 || response.status === 401) {
                localStorage.clear();
                router.push('/401');
            }
        } catch (error) {
            console.log("An error occurred during request.");
        }
    };
    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleModalShow = () => {
        setShowModal(true);
    };
    return (
        <form onSubmit={handlePost}>
            <div className="row mb-3">
                <label className="col-sm-12 col-form-label">Status</label>
                <div className="col-sm-12">
                    <select className="form-select"
                            aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                        <option selected>{status}</option>
                        <option value="WAITING">Waiting</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="REJECTED">Reject</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-12 col-form-label">Phase</label>
                <div className="col-sm-12">
                    <select className="form-select"
                            aria-label="Default select example" onChange={(e) => setPhase(e.target.value)}>
                        <option selected>{phase}</option>
                        <option value="PENYISIHAN">Penyisihan</option>
                        <option value="SEMIFINAL">Semifinal</option>
                        <option value="FINAL">Final</option>
                        <option value="DISKUALIFIKASI">Diskualifikasi</option>
                    </select>
                </div>
            </div>
            <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleModalShow}>
                    Save Changes
                </button>
            </div>
            <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex="-1"
                 style={{display: showModal ? "block" : "none"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm your change!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={handleModalClose}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure to change Status or Phase for Team {nameTeam}.
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={handleModalClose}>Close
                            </button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
