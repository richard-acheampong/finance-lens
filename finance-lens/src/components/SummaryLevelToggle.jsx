
// src/components/SummaryLevelToggle.jsx
import { useState, createContext, useContext } from "react";

const SummaryCtx = createContext({ level: "beginner", setLevel: () => {} });
export function SummaryLevelProvider({ children }) {
  const [level, setLevel] = useState("beginner");
  return <SummaryCtx.Provider value={{ level, setLevel }}>{children}</SummaryCtx.Provider>;
}
export function useSummaryLevel() { return useContext(SummaryCtx); }

export default function SummaryLevelToggle({ align = "right-on-dark" }) {
  const { level, setLevel } = useSummaryLevel();
  const options = [
    { key: "beginner", label: "Beginner" },
    { key: "pro", label: "Pro" },
    { key: "executive", label: "Executive" },
  ];

  const isDark = align === "right-on-dark";
  const baseColor = isDark ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-black";
  const activeColor = isDark ? "text-white font-medium" : "text-black font-medium";

  return (
    <div className="flex items-center gap-6 md:gap-8">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => setLevel(opt.key)}
          className={`text-sm ${level === opt.key ? activeColor : baseColor}`}
          style={{ background: "transparent", padding: 0 }}
          aria-label={`Set summary level to ${opt.label}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
