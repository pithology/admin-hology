"use client";
import React, {useEffect, useState} from "react";
import CompetitionList from "@/components/handler/page/competition";
import {useRouter} from "next/navigation";

export default function Sidebar({active, role, apiurl, basepath}) {
    const router = useRouter();
    const [isCompetitionOpen, setCompetitionOpen] = useState(false);
    const [isSeminarOpen, setSeminarOpen] = useState(false);
    const [isManagementOpen, setManagementOpen] = useState(false);
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    useEffect(() => {
        if (active === 'Competition' || active === 'Detail') {
            setCompetitionOpen(true);
        }
        if (active === 'Seminar Attendance' || active === 'Seminar Check-in') {
            setSeminarOpen(true);
        }
        if (active === 'Admin Management' || active === 'Competition Management') {
            setManagementOpen(true);
        }
    }, []);

    const toggleCompetition = () => setCompetitionOpen(!isCompetitionOpen);
    const toggleSeminar = () => setSeminarOpen(!isSeminarOpen);
    const toggleManagement = () => setManagementOpen(!isManagementOpen);
    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };
    return (<>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className={`nav-link ${active === 'Dashboard' ? '' : 'collapsed'}`} href={`${basepath}/`}>
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${active === 'User Management' ? '' : 'collapsed'}`}
                           href={`${basepath}/user`}>
                            <i className="bi bi-people"></i>
                            <span>User</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${active === 'Competition' || active === 'Detail' ? '' : 'collapsed'}`}
                           onClick={toggleCompetition} href="#">
                            <i className="bi bi-code-slash"></i><span>Competition</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul className={`nav-content collapse ${isCompetitionOpen ? 'show' : ''}`}>
                            <CompetitionList apiurl={apiurl} basepath={basepath}></CompetitionList>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${active === 'Seminar Attendance' || active === 'Seminar Check-in' ? '' : 'collapsed'}`}
                           onClick={toggleSeminar} href="#">
                            <i className="bi bi-megaphone"></i><span>Seminar</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul className={`nav-content collapse ${isSeminarOpen ? 'show' : ''}`}>
                            <li>
                                <a href={`${basepath}/seminar`}
                                   className={active === 'Seminar Attendance' ? 'active' : ''}>
                                    <i className="bi bi-circle"></i><span>Attendance</span>
                                </a>
                            </li>
                            <li>
                                <a href={`${basepath}/seminar/check-in`}
                                   className={active === 'Seminar Check-in' ? 'active' : ''}>
                                    <i className="bi bi-circle"></i><span>Check-in</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {role === 'GOD' && (<li className="nav-item">
                            <a className={`nav-link ${active === 'Admin Management' || active === 'Competition Management' ? '' : 'collapsed'}`}
                               onClick={toggleManagement} href="#">
                                <i className="bi bi-columns-gap"></i><span>Admin Panel</span><i
                                className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul className={`nav-content collapse ${isManagementOpen ? 'show' : ''}`}>
                                <li>
                                    <a href={`${basepath}/management`}
                                       className={active === 'Admin Management' ? 'active' : ''}>
                                        <i className="bi bi-circle"></i><span>Admin Management</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`${basepath}/management/competition`}
                                       className={active === 'Competition Management' ? 'active' : ''}>
                                        <i className="bi bi-circle"></i><span>Competition Management</span>
                                    </a>
                                </li>
                            </ul>
                        </li>)}
                    <li className="nav-item">
                        <a className={`nav-link ${active === 'Profile Settings' ? '' : 'collapsed'}`}
                           href={`${basepath}/profile`}>
                            <i className="bi bi-key"></i>
                            <span>Change Password</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" onClick={() => setShowLogoutAlert(true)}>
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Log out</span>
                        </a>
                    </li>
                </ul>
            </aside>
            {showLogoutAlert && (
                <div className="alert alert-warning alert-dismissible fade show floating-alert" role="alert"
                     style={{top: '20%'}}>
                    <h4 className="alert-heading">Sign-out alert</h4>
                    <p>Apakah kamu yakin ingin sign-out?</p>
                    <button
                        type="button"
                        className="btn btn-outline-warning"
                        onClick={() => {
                            handleLogout();
                            setShowLogoutAlert(false);
                        }}
                    >
                        Konfirmasi
                    </button>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setShowLogoutAlert(false)}
                    ></button>
                </div>)}
        </>)
}