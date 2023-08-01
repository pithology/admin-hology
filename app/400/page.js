import basepath from "@/components/utils/path";

const title = 'Bad Request';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function BadRequest() {
    return (
        <main>
            <div className="container">
                <section
                    className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>400</h1>
                    <h2>Some required parameters are missing from the request.</h2>
                    <a className="btn" href={`${basepath}`}>Back to home</a>
                    <div className="credits pt-4">
                        Developed with love by PIT
                    </div>
                </section>
            </div>
        </main>
    )
}