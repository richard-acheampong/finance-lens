
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const q = new URLSearchParams(location.search).get("q") || "";
  const timer = useRef(null);

  function onSearch(e) {
    e.preventDefault();
    const v = e.target.q.value.trim();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      navigate(v ? `/?q=${encodeURIComponent(v)}` : "/");
    }, 250);
  }

  return (
    // Set a fixed height and expose it as a CSS variable
    <header
      className="bg-black text-white border-b border-black/20 w-full"
      style={{ height: "72px", "--app-header-h": "72px" }}
    >
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          FinanceLens
        </Link>

        <div className="ml-6" />

        <div className="flex items-center gap-4 flex-1">
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:underline">Feed</Link>
            <Link to="/briefing" className="hover:underline">Briefing</Link>
            <Link to="/watchlist" className="hover:underline">Watchlist</Link>
          </nav>

          <form onSubmit={onSearch} className="flex-1">
            <label htmlFor="q" className="sr-only">Search</label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Search tickers, sources, topics..."
              className="w-full rounded px-3 py-2 text-sm bg-white text-black placeholder:text-gray-500 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
