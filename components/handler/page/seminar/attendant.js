'use client'
import React, {useEffect, useState} from "react";

export default function Attendant({apiurl}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/seminar/history`);
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
            <>
                <div className="modal-body">
                    <h3 className="modal-title text-muted">Showing report...</h3>
                    <p>Please refresh the page if the loading continues, or contact the PIT team if the issue
                        persists.</p>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"
                            data-bs-dismiss="modal">Close
                    </button>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="modal-body">
                <p className="modal-title text-muted">Reload page for refresh history</p>
                <table className="table table-borderless table-sm" id="datatable">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ticket UUID</th>
                        <th scope="col">Full name</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.ticket_uuid}</td>
                            <td>{item.user.user_fullname}</td>
                            <td>{item.user.user_email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                        data-bs-dismiss="modal">Close
                </button>
            </div>
        </>
    )
};