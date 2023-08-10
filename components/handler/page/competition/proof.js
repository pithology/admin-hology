"use client"
import React from "react";

export default function Proof({src}) {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-4 label">Bukti Pembayaran</div>
            <div className="col-lg-9 col-md-8">
                <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#largeModal">
                    Show
                </button>
            </div>
            <div className="modal fade" id="largeModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Payment Proof</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src={`https://api.hologyub.cloud/resources/payments/${src}`} alt="Payment Proof" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
