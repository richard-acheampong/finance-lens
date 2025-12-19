
// src/pages/Feed.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SentimentBadge({ s }) {
  const map = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-gray-100 text-gray-800",
    negative: "bg-red-100 text-red-800",
  };
  return <span className={`text-xs px-2 py-1 rounded ${map[s] || map.neutral}`}>{s || "neutral"}</span>;
}

export default function Feed() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [err, setErr] = useState("");
  const q = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setErr("");
        const params = new URLSearchParams({ q, lang: "en", page: "1", pageSize: "16", order: "DESC" });
        const res = await fetch(`/api/articles?${params}`);
        const data = await res.json();
        if (!cancelled) setArticles(data.articles || []);
      } catch (e) {
        if (!cancelled) setErr("Failed to load articles");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [q]);

  const list = useMemo(() => articles, [articles]);

  return (
    <div>
      {/* Header block with explicit background + text color */}
    <div className="my-4 -mx-4 bg-white px-4 py-5 sm:mx-0 sm:rounded-md">
        <h1 className="text-xl font-semibold text-gray-900">Latest Headlines</h1>
      </div>

      {loading && <p className="text-sm text-gray-600">Loading…</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
      {!loading && !err && !list.length && <p className="text-sm text-gray-600">No articles found.</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {list.map((a) => {
          const id = encodeURIComponent(a.id);
          return (
            <Link
              key={a.id}
              to={`/article/${id}`}
              className="group bg-white rounded-lg border hover:shadow-sm transition"
            >
              <div className="p-4 flex gap-4">
                <img
                  src={(a.images && a.images[0]) || "/placeholder.jpg"}
                  alt=""
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium group-hover:underline line-clamp-2">{a.title}</h3>
                  <div className="mt-1 text-xs text-gray-600">
                    {a.source} • {new Date(a.publishDate).toLocaleString()}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <SentimentBadge s={a.sentiment} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
