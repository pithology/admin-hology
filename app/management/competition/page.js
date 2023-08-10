import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";
import CompeTable from "@/components/handler/page/management/compeTable";

const title = 'Competition Management';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function CompetitionManagement() {
    return (
        <>
            <Header active={title} basepath={basepath} apiurl={apiurl}></Header>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>{title}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={`${basepath}`}>Home</a></li>
                            <li className="breadcrumb-item">Admin Panel</li>
                            <li className="breadcrumb-item active">{title}</li>
                        </ol>
                    </nav>
                </div>
                <section>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body pt-4">
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                        <i className="bi bi-exclamation-triangle me-1"></i>
                                        This is a private feature, only admins with the specified role can access it!
                                        <button type="button" className="btn-close" data-bs-dismiss="alert"
                                                aria-label="Close"></button>
                                    </div>
                                    <CompeTable basepath={basepath} apiurl={apiurl}></CompeTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}