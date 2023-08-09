'use client';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Auth({apiurl}) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            router.push('/')
        }
    }, [router]);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiurl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"admin_email": email, "admin_password": password}),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('successMessage', data.message);
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('userData', JSON.stringify(data.data));
                router.push('/');
            } else {
                const data = await response.json();
                setLoginError(data.message || "Login failed!");
            }
        } catch (error) {
            setLoginError("An error occurred during login.");
        }
    };
    return (
        <>
            <form className="row g-3 needs-validation" onSubmit={handleLogin} noValidate>
                <div className="col-12">
                    <label htmlFor="yourEmail" className="form-label">Email</label>
                    <div className="input-group has-validation">
                        <input type="email" name="email" className="form-control"
                               id="yourEmail" value={email}
                               onChange={(e) => setEmail(e.target.value)} required/>
                        <div className="invalid-feedback">Please enter your email.
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="yourPassword" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control"
                           id="yourPassword" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <div className="invalid-feedback">Please enter your password!</div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                </div>
            </form>
            {loginError &&
                <div className="alert alert-danger alert-dismissible fade show floating-alert" role="alert">
                    <i className="bi bi-exclamation-octagon me-1"></i>
                    {loginError}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                            onClick={() => {
                                setLoginError(null);
                            }}>
                    </button>
                </div>
            }
        </>
    )
}