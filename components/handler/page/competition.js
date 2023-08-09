"use client";
import React, {useEffect, useState} from "react";

export default function CompetitionList({apiurl, basepath}) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/competition`);
            const responseData = await response.json();
            setList(responseData);
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
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <>{list.map(data => (
            <li key={data.id}>
                <a href={`${basepath}/competition?competition_id=${data.id}`}>
                    <i className="bi bi-circle"></i><span>{data.name}</span>
                </a>
            </li>
        ))}</>
    )
}