import basepath from "@/components/utils/path";

const title = 'Unauthorized';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function Unauthorized() {
    return (
        <main>
            <div className="container">
                <section
                    className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>401</h1>
                    <h2>You need to login to access this page. Please login first.</h2>
                    <a className="btn" href={`${basepath}/login`}>Redirect to Login page</a>
                    <div className="credits pt-4">
                        Developed with love by PIT
                    </div>
                </section>
            </div>
        </main>
    )
}