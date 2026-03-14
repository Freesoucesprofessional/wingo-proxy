import { HttpsProxyAgent } from 'https-proxy-agent';

export default async function handler(req, res) {
  const ts = Date.now();
  
  // Webshare residential proxy (your credentials)
  const proxy = 'http://dknaqtqn:edt8dlwvmf4a@31.59.20.176:6754';
  const agent = new HttpsProxyAgent(proxy);
  
  try {
    const r = await fetch(
      `https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?ts=${ts}`,
      {
        agent,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "application/json",
          "Referer": "https://bdgah.com/",
          "Origin": "https://bdgah.com",
        }
      }
    );
    const text = await r.text();
    if (text.trim().startsWith("<")) {
      return res.status(502).json({ error: "upstream_blocked" });
    }
    res.status(200).json(JSON.parse(text));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
