export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const BOT_TOKEN = '7710633080:AAFFKPjFt_WcTNpUUEevhK_8Aef3SFsVyFs';
  const CHAT_ID = '6873334348';

  const { text } = req.body;

  if (!text) {
    res.status(400).json({ ok: false, error: 'Missing text' });
    return;
  }

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text
        })
      }
    );
    const data = await tgRes.json();
    res.status(200).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.toString() });
  }
}
