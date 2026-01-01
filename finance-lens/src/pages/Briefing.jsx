
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorBanner from "../components/ErrorBanner";

export default function Briefing() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true); setErr("");
        // Larger grab for digest; English default
        const res = await fetch(`/api/articles?pageSize=50&order=DESC&lang=en`);
        const data = await res.json();
        const list = data.articles || [];

        // Group by source
        const bySource = {};
        for (const a of list) {
          const key = a.source || "Unknown";
          bySource[key] = bySource[key] || [];
          bySource[key].push(a);
        }

        const groupsArr = Object.entries(bySource)
          .map(([source, items]) => ({
            source,
            count: items.length,
            top: items.slice(0, 5), // show more headlines per source on wider layouts
          }))
          .sort((a, b) => b.count - a.count);

        if (!cancelled) setGroups(groupsArr);
      } catch (e) {
        if (!cancelled) setErr("Failed to build briefing");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <p className="text-sm text-gray-600">Building briefing…</p>;
  if (err) return <ErrorBanner message={err} />;

  return (
    <div className="w-full">
      {/* Padded header + intro */}
      <div className="px-4 sm:px-6 lg:px-20">
        <h1 className="text-2xl sm:text-3xl font-semibold">Briefing (Source-based)</h1>
        <p className="text-sm text-gray-600">Top sources and their latest headlines.</p>
      </div>

      {/* Full-bleed list */}
      <div className="mt-4 px-20">
        <ul className="space-y-5 ">
          {groups.map(g => (
            <li key={g.source} className="bg-white border rounded p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-base sm:text-lg font-semibold">{g.source}</h2>
                <span className="text-xs text-gray-500">({g.count})</span>
              </div>

              <ul className="mt-2 space-y-2">
                {g.top.map(a => (
                  <li key={a.id} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <Link
                      to={`/article/${encodeURIComponent(a.id)}`}
                      className="text-sm hover:underline flex-1"
                    >
                      {a.title}
                    </Link>
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {new Date(a.publishDate).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
