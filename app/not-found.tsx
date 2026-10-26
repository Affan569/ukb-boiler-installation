import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-[#0a2a6b]">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-[#0a2a6b]">Page Not Found</h2>
        <p className="mt-4 text-gray-600 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a2a6b] px-8 py-4 text-white font-bold hover:bg-[#0b7cf0] transition"
        >
          Go Back Home
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
