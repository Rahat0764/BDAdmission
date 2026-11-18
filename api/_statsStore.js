import fs from 'fs';
import path from 'path';

const TMP_FILE = path.join('/tmp', 'bd_admission_daily_stats.json');

export function getBdDateInfo(now = new Date()) {
  const bdTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
  const bdDate = new Date(bdTimeStr);
  const yyyy = bdDate.getFullYear();
  const mm = String(bdDate.getMonth() + 1).padStart(2, '0');
  const dd = String(bdDate.getDate()).padStart(2, '0');
  const dateKey = `${yyyy}-${mm}-${dd}`;
  const formattedTime = now.toLocaleString('bn-BD', {
    timeZone: 'Asia/Dhaka',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  return { dateKey, formattedTime, bdDate };
}

export function getTelegramConfig() {
  const botToken =
    process.env.TELEGRAM_BOT_TOKEN ||
    process.env.BOT_TOKEN ||
    process.env.VITE_TG_TOKEN ||
    '';
  const rawUsers =
    process.env.AUTHORIZED_USER_ID ||
    process.env.TELEGRAM_CHAT_ID ||
    process.env.VITE_TG_CHAT_ID ||
    '';
  const chatIds = rawUsers
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return { botToken, chatIds };
}

export async function sendTelegramAlert(text) {
  const { botToken, chatIds } = getTelegramConfig();
  if (!botToken || chatIds.length === 0) {
    return { ok: false, reason: 'Missing TELEGRAM_BOT_TOKEN or AUTHORIZED_USER_ID in .env' };
  }
  const cleanToken = botToken.startsWith('bot') ? botToken.slice(3) : botToken;
  const url = `https://api.telegram.org/bot${cleanToken}/sendMessage`;

  const results = [];
  for (const chatId of chatIds) {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });
      const data = await resp.json();
      results.push({ chatId, ok: resp.ok, data });
    } catch (err) {
      results.push({ chatId, ok: false, error: String(err) });
    }
  }
  return { ok: true, results };
}

function readLocalStore() {
  if (!globalThis.__bdAdmissionStats) {
    globalThis.__bdAdmissionStats = {};
  }
  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      globalThis.__bdAdmissionStats = { ...parsed, ...globalThis.__bdAdmissionStats };
    }
  } catch (e) {}
  return globalThis.__bdAdmissionStats;
}

function writeLocalStore(store) {
  globalThis.__bdAdmissionStats = store;
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (e) {}
}

export function recordVisit({ dateKey, ip, source, uni, ua }) {
  const store = readLocalStore();
  if (!store[dateKey]) {
    store[dateKey] = {
      totalVisits: 0,
      webVisits: 0,
      webviewVisits: 0,
      ips: {},
      unis: {}
    };
  }
  const dayData = store[dateKey];
  dayData.totalVisits += 1;
  if (String(source).toLowerCase().includes('webview') || String(source).toLowerCase().includes('android')) {
    dayData.webviewVisits += 1;
  } else {
    dayData.webVisits += 1;
  }
  const safeIp = ip || 'Unknown';
  dayData.ips[safeIp] = (dayData.ips[safeIp] || 0) + 1;
  if (uni) {
    dayData.unis[uni] = (dayData.unis[uni] || 0) + 1;
  }
  writeLocalStore(store);

  const uniqueIpCount = Object.keys(dayData.ips).length;
  return {
    totalVisits: dayData.totalVisits,
    uniqueIpCount,
    webVisits: dayData.webVisits,
    webviewVisits: dayData.webviewVisits,
    ipVisitsToday: dayData.ips[safeIp]
  };
}

export function getStatsForDate(dateKey) {
  const store = readLocalStore();
  const dayData = store[dateKey] || {
    totalVisits: 0,
    webVisits: 0,
    webviewVisits: 0,
    ips: {},
    unis: {}
  };
  const ipEntries = Object.entries(dayData.ips).sort((a, b) => b[1] - a[1]);
  return {
    dateKey,
    totalVisits: dayData.totalVisits,
    uniqueIpCount: ipEntries.length,
    webVisits: dayData.webVisits,
    webviewVisits: dayData.webviewVisits,
    topIps: ipEntries.slice(0, 15),
    unis: dayData.unis
  };
}
