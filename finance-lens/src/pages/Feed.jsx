
// src/pages/Feed.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FiltersBar from "../components/FiltersBar";
import SkeletonCard from "../components/SkeletonCard";
import ErrorBanner from "../components/ErrorBanner";
import Pagination from "../components/Pagination";
import WatchlistButton from "../components/WatchlistButton";

function SentimentBadge({ s }) {
  const map = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-gray-100 text-gray-800",
    negative: "bg-red-100 text-red-800",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded ${map[s] || map.neutral}`}>
      {s || "neutral"}
    </span>
  );
}

const PAGE_SIZE = 12;

export default function Feed() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [err, setErr] = useState("");

  const params = new URLSearchParams(location.search);

  // URL params
  const q = params.get("q") || "";
  const lang = params.get("lang") || "en";
  const order = params.get("order") || "DESC";
  const tickers = params.get("tickers") || "";
  const sources = params.get("sources") || "";
  const sentiment = params.get("sentiment") || "";
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const pageParam = parseInt(params.get("page") || "1", 10);

  const [page, setPage] = useState(pageParam);
  const [hasNext, setHasNext] = useState(false);

  // Keep URL and local page state in sync
  useEffect(() => {
    const next = new URLSearchParams(location.search);
    next.set("page", String(page));
    navigate({ pathname: "/", search: next.toString() }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Reset page when non-page filters change
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, lang, order, tickers, sources, sentiment, from, to]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setErr("");

        const req = new URLSearchParams({
          q,
          lang,
          page: String(page),
          pageSize: String(PAGE_SIZE),
          order,
        });
        if (tickers) req.set("tickers", tickers);
        if (sources) req.set("sources", sources);
        if (from) req.set("from", from);
        if (to) req.set("to", to);

        const res = await fetch(`/api/articles?${req}`);
        if (!res.ok) {
          const e = await res.json().catch(() => ({}));
          throw new Error(e?.detail || e?.error || `Error ${res.status}`);
        }
        const data = await res.json();

        const raw = data.articles || [];
        // Client-side sentiment filter (until server supports it)
        const filtered = sentiment
          ? raw.filter((a) => (a.sentiment || "neutral") === sentiment)
          : raw;

        if (!cancelled) {
          setArticles(filtered);
          setHasNext(filtered.length === PAGE_SIZE); // heuristic
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || "Failed to load articles");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [q, lang, order, tickers, sources, sentiment, from, to, page]);

  const list = useMemo(() => articles, [articles]);

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Latest Headlines</h1>

      {/* Full-width Filters */}
      <FiltersBar />

      {/* Errors */}
      <ErrorBanner message={err} />

      {/* Content */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {!list.length && (
            <p className="text-sm text-gray-600 mt-4">No articles found.</p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {list.map((a) => {
              const id = encodeURIComponent(a.id);
              return (
                <div
                  key={a.id}
                  className="group bg-white rounded-lg border hover:shadow-sm transition"
                >
                  {/* Pass article via state for instant Article render */}
                  <Link to={`/article/${id}`} state={{ article: a }}>
                    <div className="p-4 flex gap-4">
                      <img
                        src={(a.images && a.images[0]) || "/placeholder.jpg"}
                        alt=""
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium group-hover:underline line-clamp-2">
                          {a.title}
                        </h3>
                        <div className="mt-1 text-xs text-gray-600">
                          {a.source} •{" "}
                          {a.publishDate
                            ? new Date(a.publishDate).toLocaleString()
                            : ""}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="px-4 pb-4 flex items-center gap-2">
                    <SentimentBadge s={a.sentiment} />
                    <WatchlistButton article={a} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            onChange={(p) => p > 0 && setPage(p)}
            hasPrev={page > 1}
            hasNext={hasNext}
          />
        </>
      )}
    </div>
  );
}
