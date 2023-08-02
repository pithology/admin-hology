import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QRCodeScanner from "@/components/utils/qrscanner/scanner";
import Attendant from "@/components/datatable/attendant";

const title = 'Seminar Check-in';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function CheckIn() {
    return (
        <>
            <Header active={title}></Header>
            <main id="main" className="main">
                <section>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Tool Box</h6>
                                    <div className="col-12">
                                        <form className="row g-3 needs-validation" noValidate>
                                            <div className="col-12 pt-1">
                                                <label htmlFor="yourUUID" className="form-label">
                                                    <h6>Scanner Error? Try enter your UUID.</h6>
                                                </label>
                                                <div className="input-group has-validation">
                                                    <input type="text" name="uuid" className="form-control"
                                                           id="yourUUID" required/>
                                                    <div className="invalid-feedback">Please enter your uuid.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 d-grid gap-2 mt-3">
                                                <button className="btn btn-primary" type="submit">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-grid gap-2 mt-3">
                                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalDialogScrollable">Check-in Report</button>
                                            <div className="modal fade" id="modalDialogScrollable" tabIndex="-1">
                                                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Check-in Report</h5>
                                                            <button type="button" className="btn-close"
                                                                    data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <Attendant></Attendant>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-bs-dismiss="modal">Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <QRCodeScanner></QRCodeScanner>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}