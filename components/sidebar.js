"use client";
import {useEffect, useState} from "react";
import CompetitionList from "@/components/handler/page/competition";
import {useRouter} from "next/navigation";

export default function Sidebar({active, role, apiurl, basepath}) {
    const router = useRouter();
    const [isCompetitionOpen, setCompetitionOpen] = useState(false);
    const [isSeminarOpen, setSeminarOpen] = useState(false);

    useEffect(() => {
        if (active === 'Competition' || active === 'Detail') {
            setCompetitionOpen(true);
        }
        if (active === 'Seminar Attendance' || active === 'Seminar Check-in') {
            setSeminarOpen(true);
        }
    }, []);

    const toggleCompetition = () => setCompetitionOpen(!isCompetitionOpen);
    const toggleSeminar = () => setSeminarOpen(!isSeminarOpen);
    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className={`nav-link ${active === 'Dashboard' ? '' : 'collapsed'}`} href={`${basepath}/`}>
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
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
                            <a href={`${basepath}/seminar`} className={active === 'Seminar Attendance' ? 'active' : ''}>
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
                {role === 'GOD' && (
                    <li className="nav-item">
                        <a className={`nav-link ${active === 'Admin Management' ? '' : 'collapsed'}`}
                           href={`${basepath}/management`}>
                            <i className="bi bi-people"></i>
                            <span>Admin Management</span>
                        </a>
                    </li>
                )}
                <li className="nav-item">
                    <a className={`nav-link ${active === 'Profile Settings' ? '' : 'collapsed'}`}
                       href={`${basepath}/profile`}>
                        <i className="bi bi-key"></i>
                        <span>Change Password</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Log out</span>
                    </a>
                </li>
            </ul>
        </aside>
    )
}