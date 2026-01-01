
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Feed from "./pages/Feed.jsx";
import Article from "./pages/Article.jsx";
import Briefing from "./pages/Briefing.jsx";
import { WatchlistProvider } from "./components/WatchlistStore.jsx";

export default function App() {
  return (
    <WatchlistProvider>
      {/* Full viewport height, full-width app shell */}
      <div className="min-h-dvh flex flex-col bg-gray-50">
        <Header />

        {/* Full-width main with responsive padding */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/article/:encodedId" element={<Article />} />
            <Route path="/briefing" element={<Briefing />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </WatchlistProvider>
  );
}
