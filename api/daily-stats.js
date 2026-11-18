import { getBdDateInfo, getStatsForDate, sendTelegramAlert } from './_statsStore.js';

export default async function handler(req, res) {
  try {
    const now = new Date();
    // When triggered at 12:00 AM midnight BD time (18:00 UTC), report the day that just completed
    // or support ?date=YYYY-MM-DD query param (or ?today=1 for current day preview)
    const useCurrentDay = req.query?.today === '1';
    const targetTime = useCurrentDay ? now : new Date(now.getTime() - 10 * 60 * 1000);
    const { dateKey, formattedTime } = getBdDateInfo(targetTime);
    const targetDateKey = req.query?.date || dateKey;

    const stats = getStatsForDate(targetDateKey);

    const ipListText = stats.topIps.length > 0
      ? stats.topIps.map(([ip, count], idx) => `${idx + 1}. <code>${ip}</code> : ${count} বার`).join('\n')
      : 'কোনো ভিজিট রেকর্ড পাওয়া যায়নি';

    const message = [
      `📊 <b>ডেইলি ভিজিটর স্ট্যাটাস রিপোর্ট (রাত ১২:০০টা)</b>`,
      `📅 <b>তারিখ:</b> <code>${targetDateKey}</code>`,
      ``,
      `👥 <b>মোট ভিজিট:</b> <b>${stats.totalVisits}</b> বার`,
      `🔑 <b>মোট ইউনিক আইপি:</b> <b>${stats.uniqueIpCount}</b> টি`,
      `🌐 <b>ওয়েব ব্রাউজার থেকে:</b> <b>${stats.webVisits}</b> বার`,
      `📱 <b>ন্যাটিভ ওয়েবভিউ অ্যাপ থেকে:</b> <b>${stats.webviewVisits}</b> বার`,
      ``,
      `📋 <b>ভিজিটর আইপি তালিকা:</b>`,
      ipListText,
      ``,
      `⏰ <i>রিপোর্ট তৈরির সময়: ${formattedTime}</i>`
    ].join('\n');

    const tgResult = await sendTelegramAlert(message);

    return res.status(200).json({
      ok: true,
      date: targetDateKey,
      stats,
      telegramSent: tgResult.ok
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: String(err)
    });
  }
}
