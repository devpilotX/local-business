"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="error-page">
      <div>
        <span className="error-code">Error</span>
        <h1>This page could not load.</h1>
        <p>
          Please try again. If the problem continues, email the address shown in
          the footer.
        </p>
        <div className="error-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={reset}
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
