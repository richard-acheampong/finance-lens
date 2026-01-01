
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Feed from "./pages/Feed.jsx";
import Article from "./pages/Article.jsx";
import Briefing from "./pages/Briefing.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import { WatchlistProvider } from "./components/WatchlistStore.jsx";

export default function App() {
  return (
    <WatchlistProvider>
      {/* Full viewport app shell */}
      <div className="min-h-dvh flex flex-col bg-gray-50">
        {/* Header sets a CSS var for its height */}
        <Header />

        {/* Make main explicitly fill whatever is left below header and above footer */}
        <main
          className="w-full px-4 sm:px-6 lg:px-8"
          style={{
            // Fill the viewport minus header & footer using CSS vars we set in components
            minHeight: "calc(100dvh - var(--app-header-h, 72px) - var(--app-footer-h, 56px))",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/article/:encodedId" element={<Article />} />
            <Route path="/briefing" element={<Briefing />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>

        {/* Footer sets a CSS var for its height */}
        <Footer />
      </div>
    </WatchlistProvider>
  );
}
