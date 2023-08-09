"use client";
import React, {useEffect, useState} from "react";

export default function DashboardCompetition({apiurl, basepath}) {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/competition`);
            const responseData = await response.json();
            setCompetitions(responseData);
            if (response.ok) {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        }
    };
    useEffect(() => {
        fetchData().then();
    }, []);

    if (loading) {
        return (
            <div className="col-12">
                <div className="card recent-sales overflow-auto">
                    <div className="card-body">
                        <h5 className="card-title">Showing Competition Statistics...</h5>
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
        <>{competitions.map(data => (
            <div className="col-xxl-4 col-md-4" key={data.id}>
                <div className="card info-card sales-card">
                    <a href={`${basepath}/competition?competition_id=${data.id}`}>
                        <div className="card-body">
                            <h5 className="card-title">{data.name}</h5>
                            <div className="d-flex align-items-center">
                                <div
                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-flag"></i>
                                </div>
                                <div className="ps-3">
                                    <h6 className={data.teamsCount === 0 ? "text-danger" : ""}>
                                        {data.teamsCount} Teams
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        ))}</>
    )
}