
import { useState, createContext, useContext } from "react";

// Simple global context for Week 1–2 MVP
const SummaryCtx = createContext({ level: "beginner", setLevel: () => {} });

export function SummaryLevelProvider({ children }) {
  const [level, setLevel] = useState("beginner");
  return <SummaryCtx.Provider value={{ level, setLevel }}>{children}</SummaryCtx.Provider>;
}

export function useSummaryLevel() {
  return useContext(SummaryCtx);
}

export default function SummaryLevelToggle() {
  const { level, setLevel } = useSummaryLevel();
  const options = ["beginner","pro","executive"];
  return (
    <div className="inline-flex border rounded overflow-hidden">
      {options.map(o => (
        <button
          key={o}
          onClick={() => setLevel(o)}
          className={`px-3 py-2 text-sm ${level===o ? "bg-gray-100  text-white" : "bg-white hover:bg-gray-100"}`}
        >
          {o[0].toUpperCase()+o.slice(1)}
        </button>
      ))}
    </div>
  );
}
