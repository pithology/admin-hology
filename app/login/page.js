import Test from "@/components/utils/test";
import Auth from "@/components/handler/auth";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";

const title = 'Login';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function Login() {
    return (
        <main>
            <div className="container">
                <section
                    className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div
                                className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <a href={`${basepath}`} className="logo d-flex align-items-center w-auto">
                                        <img src={`${basepath}/logo.png`} alt="Logo Hology"/>
                                        <span className="d-none d-lg-block"> Hology 6.0</span>
                                    </a>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h6 className="card-title text-center pb-0 fs-4">Login Admin</h6>
                                            <p className="text-center small">Enter your email & password to login</p>
                                        </div>
                                        <Auth apiurl={apiurl}></Auth>
                                        <Test apiurl={apiurl}></Test>
                                    </div>
                                </div>
                                <div className="credits">
                                    Developed with love by PIT
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}