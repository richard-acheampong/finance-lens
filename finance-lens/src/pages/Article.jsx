
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorBanner from "../components/ErrorBanner.jsx";
import WatchlistButton from "../components/WatchlistButton.jsx";

export default function Article() {
  const { encodedId } = useParams();
  const id = decodeURIComponent(encodedId);
  const location = useLocation();

  // Prefer article passed via state for instant render
  const initialArticle = location.state?.article || null;

  const [article, setArticle] = useState(initialArticle);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(!initialArticle);

  useEffect(() => {
    let cancelled = false;

    if (initialArticle) return;

    async function run() {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch("/api/articles", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ q: `"${id}"`, pageSize: 1 }),
        });

        if (!res.ok) {
          const e = await res.json().catch(() => ({}));
          throw new Error(e?.detail || e?.error || `Error ${res.status}`);
        }

        const data = await res.json();
        const a = (data.articles || [])[0] || null;
        if (!cancelled) {
          if (!a) setErr("Article not found from source.");
          setArticle(a);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || "Failed to load article");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [id, initialArticle]);

  if (loading) return <p className="text-sm text-gray-600">Loading…</p>;
  if (err) return <ErrorBanner message={err} />;
  if (!article)
    return (
      <p>
        Article not found. <Link to="/" className="underline">Back</Link>
      </p>
    );

  const image = (article.images && article.images[0]) || "/placeholder.jpg";

  return (
    <article className="w-full bg-white border rounded-lg">
      <img src={image} alt="" className="w-full h-56 object-cover rounded-t-lg" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold">{article.title}</h1>
        <div className="mt-1 text-sm text-gray-600">
          {article.source} • {article.publishDate ? new Date(article.publishDate).toLocaleString() : ""}
        </div>

        <section className="mt-4">
          <h2 className="font-medium">Summary</h2>
          <p className="mt-2 text-gray-800">
            {article.summary || "No summary provided by source."}
          </p>
        </section>

        <section className="mt-4">
          <WatchlistButton article={article} />
        </section>

        <section className="mt-6">
          <a
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline text-blue-700"
          >
            Read the original source
          </a>
        </section>

        <section className="mt-6 text-xs text-gray-500">
          Informational purposes only; not financial advice.
        </section>
      </div>
    </article>
  );
}
