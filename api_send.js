export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const BOT_TOKEN = "8332592250:AAG786XZTr2FBXAC8VlcFoPxt-JPN1lRwu8";
  const CHAT_ID = "8185195385";
  const { message } = req.body;

  if (!message) return res.status(400).json({ ok: false, error: 'No message' });

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    });
    const tgData = await tgRes.json();
    res.status(200).json({ ok: true, result: tgData.result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}