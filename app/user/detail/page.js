import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";
import DetailUser from "@/components/handler/page/user/userDetail";

const title = 'Detail User';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function DetailUserPage() {
    return (
        <>
            <Header active={title} basepath={basepath} apiurl={apiurl}></Header>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>{title}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={`${basepath}`}>Home</a></li>
                            <li className="breadcrumb-item">User Management</li>
                            <li className="breadcrumb-item active">{title}</li>
                        </ol>
                    </nav>
                </div>
                <section className="section profile">
                    <div className="row">
                        <DetailUser apiurl={apiurl} basepath={basepath}></DetailUser>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}