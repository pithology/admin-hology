"use client";
import React, {useRef, useState} from 'react';
import {useRouter} from "next/navigation";

export default function Nav({userData, basepath}) {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };
    return (<>
        <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
                <li className="nav-item dropdown pe-3" ref={dropdownRef}>
                    <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                       onClick={handleDropdownToggle}>
                        <i className="bi bi-person"></i>
                        <span className="d-none d-md-block dropdown-toggle ps-2">{userData.admin_name}</span>
                    </a>
                    <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${dropdownOpen ? 'show' : ''}`}
                        style={{
                            position: 'absolute',
                            inset: '0px 0px auto auto',
                            margin: '0px',
                            transform: 'translate3d(-16px, 38px, 0px)',
                            right: 0,
                        }}>
                        <li className="dropdown-header">
                            <h6>{userData.admin_name}</h6>
                            <p>{userData.admin_email}</p>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li>
                            <a className="dropdown-item d-flex align-items-center" href={`${basepath}/profile`}>
                                <i className="bi bi-person"></i>
                                <span>Profile</span>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li>
                            <a className="dropdown-item d-flex align-items-center" href="#"
                               onClick={() => setShowLogoutAlert(true)}>
                                <i className="bi bi-box-arrow-right"></i>
                                <span>Log out</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
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
    </>);
};


