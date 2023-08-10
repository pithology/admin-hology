"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function UserVerify({apiurl, userId}) {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setToken(JSON.parse(userToken));
        }
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${apiurl}/user/verify/${userId}`, {
                method: "POST", headers: {
                    "Content-Type": "application/json", "Authorization": token,
                },
            });
            if (response.status === 403 || response.status === 401) {
                localStorage.clear();
                router.push('/401');
            }
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('successMessage', data.message);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <button type="button" className="btn btn-secondary" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    <i className="bi bi-check-circle"></i>
                )} Verify this user!
            </button>
        </>
    );
}