FinanceLens
FinanceLens is a modern React-based financial news dashboard that aggregates and displays real-time headlines from the Finlight API via a secure Vercel serverless function. It provides a clean, responsive UI with filtering, pagination, watchlist functionality, and a briefing view grouped by sources.

Features
✅ Live Financial News Feed
Powered by Finlight API through a secure serverless proxy
Displays headlines, source, publish date, sentiment badge, and thumbnail

✅ Search & Filters
Search by tickers, sources, or keywords
Filter by language, sentiment, date range, and sort order
URL-synced filters for easy sharing

✅ Pagination
Navigate through multiple pages of results
Page state synced with URL

✅ Watchlist (Local Storage)
Add/remove articles to a personal watchlist
Persistent across sessions

✅ Briefing Page
Source-based grouping of top headlines
Quick snapshot of trending sources

✅ Responsive Design
Full-screen layout for Feed and Briefing pages
Adaptive grid: 2 columns on small screens, up to 4–5 columns on large screens

✅ Serverless API Proxy
Keeps your Finlight API key secure
Normalizes article data for the frontend

Tech Stack
Frontend: React + Vite + TailwindCSS
Routing: React Router
Styling: TailwindCSS (utility-first)
Backend: Vercel Serverless Functions
API: Finlight API (financial news)

Project Structure
finance-lens/
├─ api/
│  └─ articles.js        # Vercel serverless proxy to Finlight API
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Footer.jsx
│  │  ├─ FiltersBar.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ WatchlistStore.jsx
│  │  ├─ WatchlistButton.jsx
│  │  ├─ SkeletonCard.jsx
│  │  └─ ErrorBanner.jsx
│  ├─ pages/
│  │  ├─ Feed.jsx
│  │  ├─ Article.jsx
│  │  └─ Briefing.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css
├─ index.html
├─ package.json
├─ tailwind.config.js
└─ .env.local            # Local environment variables

Installation & Setup
1. Clone the repository
    git clone <your-repo-url>
    cd finance-lens

2. Install dependencies
    npm install

3. Add environment variable
    Create a .env.local file in the project root:
    FINLIGHT_API_KEY=YOUR_REAL_KEY

Running Locally
Option A: Vercel Dev (Recommended)
Run both the frontend and serverless function locally:
npm install -g vercel
vercel dev
Access the app at: http://localhost:3000

Option B: Vite + Proxy
Add this to vite.config.js:
export default {  
    server: {    
        proxy: {      
            '/api': 'http://localhost:3000'    
        } 
    }
};

Run:
Shellvercel dev    # in one terminal
npm run dev   # in another terminal
Access the app at: http://localhost:5173

Usage
Feed Page: Browse latest headlines, apply filters, search, and paginate.
Article Page: Click any headline to view details and summary.
Watchlist: Add articles to your watchlist for quick access.
Briefing Page: View grouped headlines by source for quick insights.

Deployment

Push your code to GitHub.
Go to Vercel → Import your repo.
Add environment variable in Vercel:
FINLIGHT_API_KEY = YOUR_REAL_KEY

Deploy. Your app will be live at:
https://your-app.vercel.app

Future Enhancements
Server-side sentiment filtering.
Watchlist page for managing saved articles.
Infinite scroll option.
SEO optimization (Next.js migration).
User authentication for personalized features.


License
MIT License © 2026 FinanceLens