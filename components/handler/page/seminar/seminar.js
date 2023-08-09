'use client'
import React, {useEffect, useState} from "react";

export default function Seminar({apiurl}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/seminar`);
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
                <h3 className="card-title">Showing seminar participants...</h3>
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
            <h3>Seminar Participant Datatable</h3>
            <table className="table table-borderless" id="datatable">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Ticker UUID</th>
                    <th scope="col">Present</th>
                    <th scope="col">Instagram Story</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.user.user_fullname}</td>
                        <td>{item.ticket_uuid}</td>
                        <td>{item.present ? 'Yes' : 'No'}</td>
                        <td>
                            <a href={item.ig_story} className="btn btn-primary btn-sm" target="_blank">Redirect to
                                link...</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}