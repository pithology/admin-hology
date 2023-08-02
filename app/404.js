import basepath from "@/components/utils/path";

const title = 'NotFound';
export const metadata = {
    title: `${title} | Admin Hology 6.0`,
    description: "Created With love",
};
export default function NotFound() {
    return (
        <main>
            <div className="container">
                <section
                    className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>404</h1>
                    <h2>The page you are looking for doesn't exist.</h2>
                    <a className="btn" href={`${basepath}`}>Back to Home</a>
                    <div className="credits pt-4">
                        Developed with love by PIT
                    </div>
                </section>
            </div>
        </main>
    )
}
