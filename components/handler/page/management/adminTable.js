'use client'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import EditAdmin from "@/components/handler/page/management/editAdmin";

export default function AdminTable({apiurl, basepath}) {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userToken) {
            if (userData.admin_role !== 'GOD') {
                router.push('/403');
            } else {
                fetchData().then();
            }
        } else {
            localStorage.clear();
            router.push('/401');
        }
    }, [router]);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/admin`, {
                method: "GET", headers: {
                    "Content-Type": "application/json", "Authorization": JSON.parse(localStorage.getItem('token')),
                },
            });
            const responseData = await response.json();
            setData(responseData);
            if (response.ok) {
                setLoading(false);
            } else if (response.status === 401) {
                localStorage.clear();
                router.push('/401');
            } else if (response.status === 403) {
                if (responseData.message === 'Invalid token') {
                    localStorage.clear();
                    router.push('/401');
                } else {
                    router.push('/403');
                }
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        }
    };
    useEffect(() => {
        import('@/assets/vendor/simple-datatables/simple-datatables').then((simpleDatatables) => {
            const datatables = document.querySelectorAll('#datatable');
            datatables.forEach((datatable) => {
                new simpleDatatables.DataTable(datatable);
            });
        });
    }, []);
    if (loading) {
        return (<div className="card-body pt-4">
            <h3 className="card-title">Showing Admins...</h3>
            <p>Please refresh the page if the loading continues, or contact the PIT team if the issue
                persists.</p>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>);
    }
    return (<>
        <table className="table" id="datatable">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (<tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.admin_name}</td>
                <td>{item.admin_email}</td>
                <td>{item.admin_role}</td>
                <td>
                    <EditAdmin adminId={item.admin_id} apiurl={apiurl} role={item.admin_role}
                               email={item.admin_email} name={item.admin_name}></EditAdmin>
                </td>
            </tr>))}
            </tbody>
        </table>
    </>)
}