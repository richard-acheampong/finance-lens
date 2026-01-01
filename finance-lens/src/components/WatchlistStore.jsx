
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(items));
  }, [items]);

  function toggle(id, payload = {}) {
    setItems((prev) => {
      const exists = prev.find((x) => x.id === id);
      if (exists) return prev.filter((x) => x.id !== id);
      // Ensure addedAt is stored for later sorting/metadata
      const base = { id, addedAt: Date.now(), ...payload };
      // Avoid duplicates: if an item with same id exists, replace; else add
      const without = prev.filter((x) => x.id !== id);
      return [...without, base];
    });
  }

  function remove(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function clear() {
    setItems([]);
  }

  return <Ctx.Provider value={{ items, toggle, remove, clear }}>{children}</Ctx.Provider>;
}

export function useWatchlist() {
  return useContext(Ctx);
}
