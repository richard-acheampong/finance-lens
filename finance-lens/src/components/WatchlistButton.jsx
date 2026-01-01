
import { useWatchlist } from "./WatchlistStore";

export default function WatchlistButton({ article }) {
  const { items, toggle } = useWatchlist();
  const active = items.some(x => x.id === article.id);
  return (
    <button
      onClick={() => toggle(article.id, { title: article.title, link: article.link })}
      className={`text-xs px-2 py-1 rounded border ${
        active ? "bg-yellow-100 border-yellow-300" : "bg-white hover:bg-gray-100"
      }`}
      aria-pressed={active}
      title={active ? "Remove from Watchlist" : "Add to Watchlist"}
    >
      {active ? "Remove" : "Watchlist"}
    </button>
  );
}
