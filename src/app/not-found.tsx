import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container error-page">
      <h1>That page isn't here.</h1>
      <p>
        The link may have changed. You can return to the homepage or send an
        enquiry.
      </p>
      <Link className="button button-primary" href="/">
        Back to home
      </Link>
      <Link className="text-link" href="/contact">
        Contact Techcyme
      </Link>
    </main>
  );
}
