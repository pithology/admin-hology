"use client";
import basepath from "@/components/utils/path";
import React, {useEffect, useState} from "react";

export default function ProfileData() {
    const [data, setUserData] = useState({});
    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userDataObj = JSON.parse(userDataString);
            setUserData(userDataObj);
        }
    }, []);
    return (
        <div className="col-xl-4">
            <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img src={`${basepath}/logo.png`} alt="Profile"
                         className="rounded-circle"/>
                    <h2 className="pt-2">{data.admin_name}</h2>
                    <h3>{data.admin_email}</h3>
                </div>
            </div>
        </div>
    )
}