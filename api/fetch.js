export default async function handler(req, res) {
  const ts = Date.now();
  try {
    const r = await fetch(
      `https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?ts=${ts}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Referer": "https://bdgah.com/",
          "Origin": "https://bdgah.com",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
        }
      }
    );
    const text = await r.text();
    if (text.trim().startsWith("<")) {
      return res.status(502).json({ error: "upstream_blocked", status: r.status });
    }
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
