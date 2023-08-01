import React from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import Detail from "@/components/handler/page/competition/detail";
import basepath from "@/components/utils/path";

const title = 'Detail';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function DetailCompetition() {
    return (
        <>
            <Header></Header>
            <Sidebar active={title}></Sidebar>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>{title}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={`${basepath}`}>Home</a></li>
                            <li className="breadcrumb-item">Competition</li>
                            <li className="breadcrumb-item active">{title}</li>
                        </ol>
                    </nav>
                </div>
                <section className="section profile">
                    <div className="row">
                        <Detail></Detail>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}