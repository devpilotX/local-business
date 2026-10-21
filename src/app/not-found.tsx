import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="error-page">
      <div>
        <span className="error-code">404</span>
        <h1>This page is not here.</h1>
        <p>
          The link may have changed or the page was removed. Try the homepage or
          tell us what you were looking for.
        </p>
        <div className="error-actions">
          <Link className="button button-primary" href="/">
            Back to home
          </Link>
          <Link className="button button-outline" href="/contact">
            Contact Techcyme
          </Link>
        </div>
      </div>
    </main>
  );
}
