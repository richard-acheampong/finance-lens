
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSummaryLevel } from "../components/SummaryLevelToggle.jsx";

export default function Article() {
  const { encodedId } = useParams();
  const id = decodeURIComponent(encodedId); // using article.link as ID
  const { level } = useSummaryLevel();
  const [article, setArticle] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch("/api/articles", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ q: `"${id}"`, pageSize: 1 })
        });
        const data = await res.json();
        const a = (data.articles || [])[0] || null;
        if (!cancelled) setArticle(a);
      } catch (e) {
        if (!cancelled) setErr("Failed to load article");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <p className="text-sm text-gray-600">Loading…</p>;
  if (err) return <p className="text-sm text-red-600">{err}</p>;
  if (!article) return <p>Article not found. <Link to="/" className="underline">Back</Link></p>;

  const image = (article.images && article.images[0]) || "/placeholder.jpg";
  const base = article.summary || "No summary provided by source.";
  const summaries = {
    beginner: base,
    pro: base,
    executive: base
  };

  return (
    <article className="max-w-3xl mx-auto bg-white border rounded-lg">
      <img src={image} alt="" className="w-full h-56 object-cover rounded-t-lg" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold">{article.title}</h1>
        <div className="mt-1 text-sm text-gray-600">
          {article.source} • {new Date(article.publishDate).toLocaleString()}
        </div>

        <section className="mt-4">
          <h2 className="font-medium">Summary ({level})</h2>
          <p className="mt-2 text-gray-800">{summaries[level]}</p>
        </section>

        <section className="mt-6">
          <a href={article.link} target="_blank" rel="noreferrer" className="text-sm underline text-blue-700">
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
