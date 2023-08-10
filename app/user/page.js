import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";
import UserTable from "@/components/handler/page/user/userTable";

const title = 'User Management';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function User() {
    return (
        <>
            <Header active={title} apiurl={apiurl} basepath={basepath}></Header>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>User Management</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={`${basepath}`}>Home</a></li>
                            <li className="breadcrumb-item">User Management</li>
                        </ol>
                    </nav>
                </div>
                <UserTable apiurl={apiurl} basepath={basepath}></UserTable>
            </main>
            <Footer></Footer>
        </>
    )
}