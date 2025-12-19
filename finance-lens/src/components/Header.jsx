
// src/components/Header.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import SummaryLevelToggle from "./SummaryLevelToggle";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const q = new URLSearchParams(location.search).get("q") || "";

  function onSearch(e) {
    e.preventDefault();
    const v = e.target.q.value.trim();
    navigate(v ? `/?q=${encodeURIComponent(v)}` : "/");
  }

  return (
    <header
      className="
        bg-black text-white border-b border-black/60 sticky top-0 z-50
        [&_a]:text-white [&_a:visited]:text-white [&_a:hover]:text-white/80 [&_a:active]:text-white [&_a]:no-underline
      "
    >
      {/* Row 1: Left (Logo big), Right (Feed · Watchlist · Search aligned with equal gaps, shifted to the right) */}
      <div className="mx-auto px-4 md:px-6 lg:px-8 py-3">
        <div className="flex items-center">
          {/* LEFT: Logo — bigger and vertically centered */}
          <Link to="/" className="font-semibold text-2xl md:text-3xl leading-none">
            FinanceLens
          </Link>

          {/* Spacer pushes the group to the right */}
          <div className="flex-1" />

          {/* RIGHT GROUP: Feed · Watchlist · Search (same size as Beginner, equal spacing) */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Nav links — match Beginner size */}
            <Link to="/" className="text-sm font-medium">
              Feed
            </Link>
            <Link to="/watchlist" className="text-sm font-medium">
              Watchlist
            </Link>

            {/* Search (third item in the group) */}
            <form onSubmit={onSearch}>
              <input
                name="q"
                defaultValue={q}
                placeholder="Search headlines, sectors…"
                className="
                  w-56 md:w-72 lg:w-80
                  rounded-md border border-white/20 bg-black/30
                  text-white placeholder:text-white/70
                  px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-white/30
                "
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Row 2: SummaryLevelToggle BELOW header content, inside black background, right-aligned */}
      <div className="mx-auto px-4 md:px-6 lg:px-8 pb-3">
        <div className="w-full flex justify-end">
          {/* Make it the same size as Feed/Watchlist: text-sm */}
          <SummaryLevelToggle align="right-on-dark" />
        </div>
      </div>
    </header>
  );
}
