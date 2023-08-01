import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React from "react";
import DashboardData from "@/components/handler/page/dashboard/dashboardData";
import basepath from "@/components/utils/path";


const title = 'Dashboard';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function Home() {
    return (
        <>
            <Header></Header>
            <Sidebar active={title}></Sidebar>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>{title}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={`${basepath}`}>{title}</a></li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <DashboardData></DashboardData>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}
