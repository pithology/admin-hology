'use client'
import React, {useEffect, useState} from "react";

export default function UserTable({apiurl, basepath}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/user`);
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
        return (<div className="card-body pt-4">
                <h3 className="card-title">Showing users...</h3>
                <p>Please refresh the page if the loading continues, or contact the PIT team if the issue
                    persists.</p>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>);
    }
    return (<>
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
                                        <th scope="col">Fullname</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Institution</th>
                                        <th scope="col">Provinsi</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map((item, index) => (<tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.user_fullname}</td>
                                            <td>{item.user_email}</td>
                                            <td>{item.user_gender.toUpperCase() === 'M' || item.user_gender.toUpperCase() === 'L' ? 'Male' : item.user_gender.toUpperCase() === 'F' || item.user_gender.toUpperCase() === 'P' ? 'Female' : '?'}</td>
                                            <td>{item.institution}</td>
                                            <td>{item.provinsi.provinsi_name}</td>
                                            <td>
                                                <a href={`${basepath}/user/detail?team_id=${item.user_id}`}
                                                   className="btn btn-outline-primary btn-sm" target="_blank"><span
                                                    className="bi bi-file-earmark-text"> Detail</span></a>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>)
}