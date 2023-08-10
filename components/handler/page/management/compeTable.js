'use client'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import EditCompe from "@/components/handler/page/management/editCompe";

export default function CompeTable({apiurl, basepath}) {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/competition`);
            const responseData = await response.json();
            setData(responseData);
            if (response.ok) {
                setLoading(false);
            } else if (response.status === 401) {
                localStorage.clear();
                router.push('/401');
            } else if (response.status === 403) {
                router.push('/403');
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        }
    };
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData.admin_role !== 'GOD') {
            router.push('/403');
        }
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
                <h3 className="card-title">Showing Competitions...</h3>
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
            <table className="table" id="datatable">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Competition Name</th>
                    <th scope="col">Competition Description</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                            <EditCompe Id={item.id} apiurl={apiurl} name={item.name} desc={item.description}></EditCompe>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}