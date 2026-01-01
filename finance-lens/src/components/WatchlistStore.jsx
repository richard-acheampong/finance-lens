
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

  function toggle(id, payload) {
    setItems(prev => {
      const exists = prev.find(x => x.id === id);
      if (exists) return prev.filter(x => x.id !== id);
      return [...prev, { id, ...payload }];
    });
  }

  function remove(id) {
    setItems(prev => prev.filter(x => x.id !== id));
  }

  return <Ctx.Provider value={{ items, toggle, remove }}>{children}</Ctx.Provider>;
}

export function useWatchlist() {
  return useContext(Ctx);
}
