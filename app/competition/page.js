import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ParticipantTable from "@/components/handler/page/competition/participantTable";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";

const title = 'Competition';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function Competition() {
    return (
        <>
            <Header active={title} apiurl={apiurl} basepath={basepath}></Header>
            <main id="main" className="main">
                <ParticipantTable apiurl={apiurl} basepath={basepath}></ParticipantTable>
            </main>
            <Footer></Footer>
        </>
    )
}