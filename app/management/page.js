import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";
import AdminTable from "@/components/handler/page/management/adminTable";
import CreateAdmin from "@/components/handler/page/management/createAdmin";

const title = 'Admin Management';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function AdminManagement() {
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
                                <div className="card-body row pt-4">
                                    <div className="col-lg-11">
                                        <div className="alert alert-warning alert-dismissible fade show"
                                             role="alert">
                                            <i className="bi bi-exclamation-triangle me-1"></i>
                                            This is a private feature, only admins with the specified role can access
                                            it!
                                            <button type="button" className="btn-close" data-bs-dismiss="alert"
                                                    aria-label="Close"></button>
                                        </div>
                                    </div>
                                    <div className="col-lg-1">
                                        <CreateAdmin apiurl={apiurl}></CreateAdmin>
                                    </div>
                                    <div className="col-lg-12 pt-2">
                                        <AdminTable apiurl={apiurl} basepath={basepath}></AdminTable>
                                    </div>
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