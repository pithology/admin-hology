import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Seminar from "@/components/handler/page/seminar/seminar";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";

const title = 'Seminar Attendance';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function SeminarPage() {
    return (
        <>
            <Header active={title} apiurl={apiurl} basepath={basepath}></Header>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>{title}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={`${basepath}`}>Home</a></li>
                            <li className="breadcrumb-item active">{title}</li>
                        </ol>
                    </nav>
                </div>
                <section>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <Seminar apiurl={apiurl}></Seminar>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}