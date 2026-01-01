
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
    }, 250); // small debounce for nicer UX
  }

  return (
    <header className="bg-black text-white border-b border-black/20 w-full">
      {/* Full-width container with responsive horizontal padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-3">
        <Link to="/" className="text-xl font-semibold tracking-tight">FinanceLens</Link>
        
        <div className="ml-50" />
        
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:underline">Feed</Link>
          <Link to="/briefing" className="hover:underline">Briefing</Link>
        </nav>

        <form onSubmit={onSearch} className="flex-1">
          <label htmlFor="q" className="sr-only">Search</label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Search tickers, sources, topics..."
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </form>
      </div>
    </header>
  );
}
