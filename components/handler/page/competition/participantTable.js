'use client'
import React, {useEffect, useState} from "react";

export default function ParticipantTable({apiurl, basepath}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async ({competitionId}) => {
        try {
            const response = await fetch(`${apiurl}/competition/${competitionId}`);
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
        const queryParams = new URLSearchParams(window.location.search);
        const competitionId = queryParams.get("competition_id") || null;
        fetchData({competitionId}).then();
        import('@/public/assets/vendor/simple-datatables/simple-datatables').then((simpleDatatables) => {
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
        <>
            <div className="pagetitle">
                <h1>{data.competition.competition_name}</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href={`${basepath}`}>Home</a></li>
                        <li className="breadcrumb-item">Competition</li>
                        <li className="breadcrumb-item active">{data.competition.competition_name}</li>
                    </ol>
                </nav>
            </div>
            <section>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body pt-4">
                                <h3>Participant Datatable</h3>
                                <table className="table" id="datatable">
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
                                    {data.data.map((item, index) => (
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
                                                <a href={`${basepath}/competition/detail?team_id=${item.team_id}`}
                                                   className="btn btn-outline-primary btn-sm" target="_blank"><span
                                                    className="bi bi-file-earmark-text"> Detail</span></a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}