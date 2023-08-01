"use client";
import React, {useEffect, useState} from "react";
import apiurl from "@/components/utils/api";
import basepath from "@/components/utils/path";

export default function DashboardRecent() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/recent`);
            const responseData = await response.json();
            const updatedData = {...data, ...responseData};
            setData(updatedData);
            if(response.ok){
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
            <div className="card-body">
                <h5 className="card-title">Showing recent registration...</h5>
                <p>Please refresh the page if the loading continues, or contact the PIT team if the issue
                    persists.</p>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <div className="card-body">
            <h5 className="card-title">Recent Teams (showing last {data.totalShown} registrations out
                of {data.totalData})</h5>
            <table className="table table-borderless">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Leader Name</th>
                    <th scope="col">Competition</th>
                    <th scope="col">Join Token</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {data.competitions.map((competition) => (
                    competition.teams.map((team) => (
                        <tr key={team.team_id}>
                            <th scope="row"><a href={`${basepath}/competition/detail?team_id=${team.team_id}`}>#{team.team_id}</a></th>
                            <td>{team.team_name}</td>
                            <td><a href="#" className="text-primary">{team.team_leader.user_fullname}</a></td>
                            <td>{competition.competition_name}</td>
                            <td>{team.join_token}</td>
                            <td>
                                {team.team_status === 'WAITING' && (
                                    <span className="badge bg-warning">Pending</span>
                                )}
                                {team.team_status === 'ACCEPTED' && (
                                    <span className="badge bg-success">Accepted</span>
                                )}
                                {team.team_status === 'REJECTED' && (
                                    <span className="badge bg-danger">Rejected</span>
                                )}
                            </td>
                        </tr>
                    ))
                ))}
                </tbody>
            </table>
        </div>
    )
}