import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import basepath from "@/components/utils/path";
import ProfileData from "@/components/handler/page/profile/profileData";
import ChangePasswordForm from "@/components/handler/page/profile/changePassword";
import apiurl from "@/components/utils/api";

const title = 'Profile Settings';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function ChangePassword() {
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
                <section className="section profile">
                    <div className="row">
                        <ProfileData basepath={basepath}></ProfileData>
                        <ChangePasswordForm apiurl={apiurl}></ChangePasswordForm>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}