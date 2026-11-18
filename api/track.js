import { getBdDateInfo, recordVisit, sendTelegramAlert } from './_statsStore.js';

function extractClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    const first = Array.isArray(xff) ? xff[0] : String(xff).split(',')[0];
    if (first && first.trim()) return first.trim();
  }
  const realIp = req.headers['x-real-ip'] || req.headers['cf-connecting-ip'];
  if (realIp) return String(realIp).trim();
  return req.socket?.remoteAddress || 'Unknown';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const ip = extractClientIp(req);
    const source = body.source || 'Web Browser';
    const uni = body.uni || 'DU';
    const pathUrl = body.path || '/';
    const ua = body.ua || req.headers['user-agent'] || 'Unknown';
    const city = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : '';
    const country = req.headers['x-vercel-ip-country'] || '';
    const locationText = [city, country].filter(Boolean).join(', ');

    const { dateKey, formattedTime } = getBdDateInfo();
    const stats = recordVisit({ dateKey, ip, source, uni, ua });

    const isWebView = String(source).toLowerCase().includes('webview') || String(source).toLowerCase().includes('android');
    const platformIcon = isWebView ? '📱' : '🌐';

    const message = [
      `🔔 <b>নতুন ভিজিটর এলার্ট (BD Admission)</b>`,
      ``,
      `🌍 <b>আইপি এড্রেস:</b> <code>${ip}</code>${locationText ? ` (${locationText})` : ''}`,
      `${platformIcon} <b>প্ল্যাটফর্ম:</b> ${source}`,
      `🎓 <b>ইউনিভার্সিটি:</b> ${uni} (<code>${pathUrl}</code>)`,
      `🕒 <b>সময়:</b> ${formattedTime}`,
      `📊 <b>আজকের ভিজিট:</b> মোট ${stats.totalVisits} বার (ইউনিক আইপি: ${stats.uniqueIpCount} টি)`
    ].join('\n');

    const tgResult = await sendTelegramAlert(message);

    return res.status(200).json({
      ok: true,
      ip,
      dateKey,
      stats,
      telegramSent: tgResult.ok
    });
  } catch (err) {
    return res.status(200).json({
      ok: false,
      error: String(err)
    });
  }
}
