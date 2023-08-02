import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ParticipantTable from "@/components/handler/page/competition/participantTable";
import basepath from "@/components/utils/path";

const title = 'UI/UX Design';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function UIUX() {
    return (
        <>
            <Header active={title}></Header>
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
                                <ParticipantTable target={'uiux'}></ParticipantTable>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}