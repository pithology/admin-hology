'use client';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import UserVerify from "@/components/handler/page/user/userVerify";

export default function DetailUser({apiurl, basepath}) {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async ({teamId: userId}) => {
        try {
            const response = await fetch(`${apiurl}/user/detail/${userId}`);
            const responseData = await response.json();
            setData(responseData);
            if (response.ok) {
                setLoading(false);
            } else if (response.status === 404) {
                router.push('/404')
            } else if (response.status === 400 || userId === null) {
                router.push('/400')
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        }
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const userId = queryParams.get("team_id") || null;
        fetchData({teamId: userId}).then();
    }, []);
    if (loading) {
        return (<div className="col-lg-12">
            <div className="card">
                <div className="card-body pt-4">
                    <h3 className="card-title">Showing detail...</h3>
                    <p>Please refresh the page if the loading continues, or contact the PIT team if the issue
                        persists.</p>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>);
    }
    return (<>
        <div className="col-lg-4">
            <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    {data.email_verified_token === 'verified' ? (
                        <span className="bi bi-person-check" style={{fontSize: "64px"}}></span>) : (
                        <span className="bi bi-person-x" style={{fontSize: "64px"}}></span>)}
                    <h2>{data.user_fullname}</h2>
                    <h3 className="pt-1">{data.institution}</h3>
                    {data.email_verified_token !== 'verified' ? (
                        <UserVerify apiurl={apiurl} userId={data.user_id}/>) : ''}
                </div>
            </div>
        </div>
        <div className="col-lg-8">
            <div className="card">
                <div className="card-body">
                    <div className="tab-content">
                        <div
                            className="tab-pane fade profile-overview show active"
                            id="profile-overview">
                            <h5 className="card-title">Details</h5>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Full Name</div>
                                <div className="col-lg-9 col-md-8">{data.user_fullname}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Email</div>
                                <div className="col-lg-9 col-md-8">{data.user_email}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">BirthDate</div>
                                <div className="col-lg-9 col-md-8">{formatDate(data.user_birthdate)}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Gender</div>
                                <div
                                    className="col-lg-9 col-md-8">{data.user_gender.toUpperCase() === 'M' || data.user_gender.toUpperCase() === 'L' ? 'Male' : data.user_gender.toUpperCase() === 'F' || data.user_gender.toUpperCase() === 'P' ? 'Female' : '?'}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">No Telephone</div>
                                <div className="col-lg-9 col-md-8">{data.no_handphone}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Institution</div>
                                <div className="col-lg-9 col-md-8">{data.institution}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Province</div>
                                <div className="col-lg-9 col-md-8">{data.provinsi.provinsi_name}</div>
                            </div>
                            <h5 className="card-title">Seminar Details</h5>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Ticket UUID</div>
                                <div className="col-lg-9 col-md-8">{data.user_seminars.ticket_uuid}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Instagram Story</div>
                                <div className="col-lg-9 col-md-8"><a href={data.user_seminars.ig_story}
                                                                      target="_blank">{data.user_seminars.ig_story}</a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Present</div>
                                <div
                                    className="col-lg-9 col-md-8">{data.user_seminars.present ? 'Present' : 'Absent'}</div>
                            </div>
                            <h5 className="card-title">Competition Details</h5>
                            {data.detail_teams.length > 0 ? (data.detail_teams.map((detailTeam, index) => (
                                <div className="row" key={index}>
                                    <div
                                        className="col-lg-3 col-md-4 label">{detailTeam.teams.competitions.competition_name}</div>
                                    <div
                                        className="col-lg-9 col-md-8"><a
                                        href={`${basepath}/competition/detail?team_id=${detailTeam.team_id}`}
                                        target="_blank">{detailTeam.teams.team_name}</a></div>
                                </div>))) : (<div className="col-lg-3 col-md-4 label">Not in any competitions</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

function formatDate(dateString) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
}