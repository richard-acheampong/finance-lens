
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded border ${
        active ? "bg-black text-white border-black" : "bg-white hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export default function FiltersBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [lang, setLang] = useState(params.get("lang") || "en");
  const [order, setOrder] = useState(params.get("order") || "DESC");
  const [sentiment, setSentiment] = useState(params.get("sentiment") || "");
  const [tickers, setTickers] = useState(params.get("tickers") || "");
  const [sources, setSources] = useState(params.get("sources") || "");
  const [from, setFrom] = useState(params.get("from") || "");
  const [to, setTo] = useState(params.get("to") || "");

  useEffect(() => {
    const next = new URLSearchParams(location.search);
    const setOrDel = (k, v) => (v ? next.set(k, v) : next.delete(k));

    setOrDel("lang", lang);
    setOrDel("order", order);
    setOrDel("sentiment", sentiment);
    setOrDel("tickers", tickers);
    setOrDel("sources", sources);
    setOrDel("from", from);
    setOrDel("to", to);

    // reset page to 1 when filters change
    next.set("page", "1");

    navigate({ pathname: "/", search: next.toString() }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, order, sentiment, tickers, sources, from, to]);

  return (
    <div className="bg-white border rounded p-3 flex flex-wrap items-center gap-3">
      {/* Language */}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="text-sm border rounded px-2 py-1"
        aria-label="Language"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="de">DE</option>
        <option value="fr">FR</option>
        <option value="zh">ZH</option>
      </select>

      {/* Order */}
      <div className="flex gap-1">
        <Chip active={order === "DESC"} onClick={() => setOrder("DESC")}>Newest</Chip>
        <Chip active={order === "ASC"} onClick={() => setOrder("ASC")}>Oldest</Chip>
      </div>

      {/* Sentiment */}
      <div className="flex gap-1">
        <Chip active={sentiment === ""} onClick={() => setSentiment("")}>All</Chip>
        <Chip active={sentiment === "positive"} onClick={() => setSentiment("positive")}>Positive</Chip>
        <Chip active={sentiment === "neutral"} onClick={() => setSentiment("neutral")}>Neutral</Chip>
        <Chip active={sentiment === "negative"} onClick={() => setSentiment("negative")}>Negative</Chip>
      </div>

      {/* Tickers and Sources (CSV) */}
      <input
        value={tickers}
        onChange={(e) => setTickers(e.target.value)}
        placeholder="Tickers (CSV: AAPL,NVDA)"
        className="text-sm border rounded px-2 py-1 flex-1"
      />
      <input
        value={sources}
        onChange={(e) => setSources(e.target.value)}
        placeholder="Sources (CSV)"
        className="text-sm border rounded px-2 py-1 flex-1"
      />

      {/* Date range */}
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="text-sm border rounded px-2 py-1"
        aria-label="From date"
      />
      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="text-sm border rounded px-2 py-1"
        aria-label="To date"
      />
    </div>
  );
}
