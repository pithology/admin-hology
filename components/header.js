"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import basepath from "@/components/utils/path";
import Nav from "@/components/nav";
import Sidebar from "@/components/sidebar";

export default function Header({active}) {
    const router = useRouter();
    const [userData, setUserData] = useState({admin_name: '', admin_email: ''});
    const [successMessage, setSuccessMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(true);

    const handleAlertClose = () => {
        setShowAlert(false);
    };
    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userDataObj = JSON.parse(userDataString);
            setUserData(userDataObj);
        } else {
            router.push('/401');
        }
        const successMessage = localStorage.getItem('successMessage');
        if (successMessage) {
            setSuccessMessage(successMessage);
            localStorage.removeItem('successMessage');
        }
    }, [router]);
    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <a href={`${basepath}`} className="logo d-flex align-items-center">
                        <img src={`${basepath}/logo.png`} alt="Logo Hology"/>
                        <span className="d-none d-lg-block"> Hology 6.0</span>
                    </a>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>
                <Nav userData={userData}/>
                {successMessage && showAlert && (
                    <div className="alert alert-success alert-dismissible fade show floating-alert" role="alert">
                        <i className="bi bi-check-circle me-1"></i>
                        {successMessage}
                        <button type="button" className="btn-close" onClick={handleAlertClose}
                                aria-label="Close"></button>
                    </div>
                )}
            </header>
            <Sidebar active={active} role={userData.admin_role}></Sidebar>
        </>
    )
}