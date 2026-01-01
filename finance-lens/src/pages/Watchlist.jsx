
import { useWatchlist } from "../components/WatchlistStore";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ErrorBanner from "../components/ErrorBanner";

export default function Watchlist() {
  const { items, remove, clear } = useWatchlist();
  const [query, setQuery] = useState("");
  const [err, setErr] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (x) =>
        (x.title || "").toLowerCase().includes(q) ||
        (x.link || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  function onClearAll() {
    try {
      if (!items.length) return;
      const ok = window.confirm(`Remove all ${items.length} items from your watchlist?`);
      if (!ok) return;
      clear();
    } catch (e) {
      console.error(e);
      setErr("Failed to clear watchlist");
    }
  }

  return (
    // Flex-1 forces this page to consume the whole main height
    <div className="w-full flex-1 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">Watchlist</h1>
        <div className="flex items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search saved articles..."
            className="border rounded px-3 py-2 text-sm w-64 bg-white"
            aria-label="Search watchlist"
          />
          <button
            onClick={onClearAll}
            className="text-sm px-3 py-2 rounded border bg-white hover:bg-gray-100"
            disabled={!items.length}
            title="Clear all watchlist items"
          >
            Clear all
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-1">
        Saved articles persist in your browser (localStorage). Click a title to view details.
      </p>

      <ErrorBanner message={err} />

      {/* Stretch content area */}
      <div className="mt-6 flex-1">
        {!filtered.length ? (
          // Fill the vertical space and center the message nicely
          <div className="bg-white border rounded p-6 h-full flex items-center justify-center">
            <p className="text-sm text-gray-700">
              Your watchlist is empty. Add items from the Feed or Article pages.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filtered.map((x) => (
              <li key={x.id} className="bg-white border rounded p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/article/${encodeURIComponent(x.id)}`}
                    className="text-base font-medium hover:underline"
                  >
                    {x.title || x.link || x.id}
                  </Link>

                  <div className="flex items-center gap-2">
                    {x.link && (
                      <a
                        href={x.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs underline text-blue-700"
                      >
                        Open source
                      </a>
                    )}
                    <button
                      onClick={() => remove(x.id)}
                      className="text-xs px-2 py-1 rounded border bg-white hover:bg-gray-100"
                      title="Remove from watchlist"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-1 text-xs text-gray-600">
                  {x.addedAt
                    ? `Saved ${new Date(x.addedAt).toLocaleString()}`
                    : `Saved item`}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
