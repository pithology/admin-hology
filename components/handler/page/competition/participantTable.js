'use client'
import React, {useEffect, useState} from "react";
import apiurl from "@/components/utils/api";
import basepath from "@/components/utils/path";

export default function ParticipantTable({target}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/${target}`);
            const responseData = await response.json();
            setData(responseData);
            if (response.ok) {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        }
    };
    useEffect(() => {
        fetchData().then();
        import('@/assets/vendor/simple-datatables/simple-datatables').then((simpleDatatables) => {
            const datatables = document.querySelectorAll('#datatable');
            datatables.forEach((datatable) => {
                new simpleDatatables.DataTable(datatable);
            });
        });
    }, []);

    if (loading) {
        return (
            <div className="card-body pt-4">
                <h3 className="card-title">Showing participants...</h3>
                <p>Please refresh the page if the loading continues, or contact the PIT team if the issue
                    persists.</p>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <div className="card-body pt-4">
            <h3>Participant Datatable</h3>
            <table className="table table-borderless" id="datatable">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Leader Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Phase</th>
                    <th scope="col">Join Token</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.team_name}</td>
                        <td>{item.team_leader.user_fullname}</td>
                        <td>
                            <span
                                className={`badge ${item.team_status === 'WAITING' ? 'bg-warning' : (item.team_status === 'ACCEPTED' ? 'bg-success' : 'bg-danger')}`}>
                                    {item.team_status}
                                </span>
                        </td>
                        <td>{item.phase}</td>
                        <td>{item.join_token}</td>
                        <td>
                            <a href={`${basepath}/competition/detail?team_id=${item.team_id}`} className="btn btn-primary btn-sm" target="_blank"><span
                                className="bi bi-file-earmark-text"> Detail</span></a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}