import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QRCodeScanner from "@/components/utils/qrscanner/scanner";
import Attendant from "@/components/handler/page/seminar/attendant";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";
import ManualCheckIn from "@/components/handler/page/seminar/manualCheckIn";

const title = 'Seminar Check-in';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function CheckIn() {
    return (
        <>
            <Header active={title} basepath={basepath} apiurl={apiurl}></Header>
            <main id="main" className="main">
                <section>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Tool Box</h6>
                                    <ManualCheckIn apiurl={apiurl}></ManualCheckIn>
                                    <div className="col-12">
                                        <div className="d-grid gap-2 mt-3">
                                            <button className="btn btn-primary" type="button" data-bs-toggle="modal"
                                                    data-bs-target="#modalDialogScrollable">Check-in Report
                                            </button>
                                            <div className="modal fade" id="modalDialogScrollable" tabIndex="-1">
                                                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Check-in Report</h5>
                                                            <button type="button" className="btn-close"
                                                                    data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <Attendant apiurl={apiurl}></Attendant>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <QRCodeScanner apiurl={apiurl}></QRCodeScanner>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}