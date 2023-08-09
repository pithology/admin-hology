'use client'
import {useEffect} from "react";

export default function Attendant() {
    useEffect(() => {
        import('@/assets/vendor/simple-datatables/simple-datatables').then((simpleDatatables) => {
            const datatables = document.querySelectorAll('#datatable');
            datatables.forEach((datatable) => {
                new simpleDatatables.DataTable(datatable);
            });
        });
    }, []);
    return (
        <table className="table table-borderless table-sm" id="datatable">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Full name</th>
                <th scope="col">Email</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Brandon Jacob</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Bridie Kessler</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Ashleigh Langosh</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">4</th>
                <td>Angus Grady</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Raheem Lehner</td>
                <td>Brandon Jacob</td>
            </tr>
            </tbody>
        </table>
    )
};