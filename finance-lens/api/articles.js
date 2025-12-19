
export default async function handler(req, res) {
  try {
    if (req.method !== "POST" && req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const apiKey = process.env.FINLIGHT_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing FINLIGHT_API_KEY" });

    const url = "https://api.finlight.me/v2/articles";

    const params = req.method === "GET" ? req.query : (req.body || {});
    const {
      q = "", lang = "en", page = "1", pageSize = "12", from = "", to = "",
      tickers = "", sources = "", order = "DESC"
    } = params;

    const body = {
      query: q || undefined,
      language: lang,
      page: Number(page),
      pageSize: Number(pageSize),
      from: from || undefined,
      to: to || undefined,
      tickers: tickers ? tickers.split(",") : undefined,
      sources: sources ? sources.split(",") : undefined,
      order
    };

    const finRes = await fetch(url, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "X-API-KEY": apiKey
      },
      body: JSON.stringify(body)
    });

    if (!finRes.ok) {
      const errText = await finRes.text();
      return res.status(finRes.status).json({ error: "Finlight error", detail: errText });
    }

    const data = await finRes.json();
    const articles = (data.articles || []).map((a, idx) => ({
      id: a.link || `art-${idx}`,
      title: a.title,
      source: a.source,
      summary: a.summary,
      publishDate: a.publishDate,
      images: a.images || [],
      sentiment: a.sentiment || "neutral",
      confidence: a.confidence || null,
      companies: a.companies || [],
      link: a.link
    }));

    res.setHeader("cache-control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ page: data.page, pageSize: data.pageSize, articles });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
