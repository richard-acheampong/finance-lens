
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Feed from "./pages/Feed.jsx";
import Article from "./pages/Articles.jsx";
import { SummaryLevelProvider } from "./components/SummaryLevelToggle.jsx";

export default function App() {
  return (
    <SummaryLevelProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 w-full mx-auto px-4 py-6 max-w-none">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/article/:encodedId" element={<Article />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SummaryLevelProvider>
  );
}
