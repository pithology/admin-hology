'use client';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Announcement from "@/components/handler/page/competition/announcement";
import EditDetail from "@/components/handler/page/competition/editDetail";
import Proof from "@/components/handler/page/competition/proof";

export default function Detail({apiurl, basepath}) {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("profile-overview");
    const [showAlert, setShowAlert] = useState(true);
    const handleAlertClose = () => {
        setShowAlert(false);
    };
    const fetchData = async ({teamId}) => {
        try {
            const response = await fetch(`${apiurl}/competition/detail/${teamId}`);
            const responseData = await response.json();
            setData(responseData);
            if (response.ok) {
                setLoading(false);
            } else if (response.status === 404) {
                router.push('/404')
            } else if (response.status === 400 || teamId === null) {
                router.push('/400')
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        }
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const teamId = queryParams.get("team_id") || null;
        fetchData({teamId}).then();
    }, []);
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    if (loading) {
        return (
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body pt-4">
                        <h3 className="card-title">Showing detail...</h3>
                        <p>Please refresh the page if the loading continues, or contact the PIT team if the issue
                            persists.</p>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                        <span className="bi bi-people" style={{fontSize: "64px"}}></span>
                        <h2>{data.team_name}</h2>
                        <h3 className="pt-1">Leading by {data.leader_name}</h3>
                        <h5>
                            <span
                                className={`badge ${data.status === 'WAITING' ? 'bg-warning' : data.status === 'ACCEPTED' ? 'bg-success' : 'bg-danger'}`}>{data.status}
                            </span>
                        </h5>
                        <span className="badge border-primary border-1 text-secondary pt-1">{data.competition}</span>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="card">
                    <div className="card-body pt-3">
                        <ul className="nav nav-tabs nav-tabs-bordered">
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === "profile-overview" ? "active" : ""}`}
                                        onClick={() => handleTabClick("profile-overview")}>Overview
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === "profile-edit" ? "active" : ""}`}
                                        onClick={() => handleTabClick("profile-edit")}>Edit Team
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === "profile-announcement" ? "active" : ""}`}
                                        onClick={() => handleTabClick("profile-announcement")}>Announcement
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content pt-2">
                            <div
                                className={`tab-pane fade profile-overview ${activeTab === "profile-overview" ? "show active" : ""}`}
                                id="profile-overview">
                                <h5 className="card-title">Team Details</h5>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Team Name</div>
                                    <div className="col-lg-9 col-md-8">{data.team_name}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Leader Name</div>
                                    <div className="col-lg-9 col-md-8">{data.leader_name}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Member 1</div>
                                    <div className="col-lg-9 col-md-8">{data.member_1}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Member 2</div>
                                    <div className="col-lg-9 col-md-8">{data.member_2}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Team Biodata</div>
                                    <div className="col-lg-9 col-md-8">{data.team_biodata}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Institution</div>
                                    <div className="col-lg-9 col-md-8">{data.institution}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Join Token</div>
                                    <div className="col-lg-9 col-md-8">{data.join_token}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Status</div>
                                    <div
                                        className="col-lg-9 col-md-8">{data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase()}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Phase</div>
                                    <div className="col-lg-9 col-md-8">{data.phase === "DISKUALIFIKASI" ? "Eliminated" : data.phase.charAt(0).toUpperCase() + data.phase.slice(1).toLowerCase()}</div>
                                </div>
                                <h5 className="card-title">Payment Details</h5>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label ">Nama Rekening</div>
                                    <div className="col-lg-9 col-md-8">{data.nama_rekening}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">No Rekening</div>
                                    <div className="col-lg-9 col-md-8">{data.no_rekening}</div>
                                </div>
                                <Proof src={data.payment_proof}></Proof>
                            </div>
                            <div
                                className={`tab-pane fade profile-edit ${activeTab === "profile-edit" ? "show active" : ""}`}
                                id="profile-edit">
                                <EditDetail status={data.status} phase={data.phase} teamId={data.team_id}
                                            nameTeam={data.team_name} apiurl={apiurl}></EditDetail>
                            </div>
                            <div
                                className={`tab-pane fade profile-overview ${activeTab === "profile-announcement" ? "show active" : ""}`}
                                id="profile-announcement">
                                {data.judul === '' && data.deskripsi === '' && showAlert ? (
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                        <i className="bi bi-exclamation-triangle me-1"></i>
                                        Data is empty, try to replace it
                                        <button type="button" className="btn-close" data-bs-dismiss="alert"
                                                aria-label="Close" onClick={handleAlertClose}></button>
                                    </div>
                                ) : (
                                    <>
                                        <h5 className="card-title">{data.judul}</h5>
                                        <p className="small">{data.deskripsi}</p>
                                    </>
                                )}
                                <Announcement teamId={data.team_id} apiurl={apiurl}></Announcement>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}