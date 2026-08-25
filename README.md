# 🎓 BD Admission

**A live countdown tracker for Bangladeshi university admission tests — DU, JNU, RU, CU, MIST, and more.**

Track every unit's exam date in one place, switch universities instantly, and share a direct link straight to any unit's countdown. Available as a website and as a native Android app with a home-screen widget.

<p align="center">
  <a href="https://bd-admission.vercel.app/"><img src="https://img.shields.io/badge/Live%20Site-bd--admission.vercel.app-3b82f6?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/Rahat0764/BDAdmissio?style=flat-square&color=3b82f6" alt="Latest Release">
  <img src="https://img.shields.io/github/downloads/Rahat0764/BDAdmissio/total?style=flat-square&color=22c55e&label=downloads" alt="Total Downloads">
  <img src="https://img.shields.io/github/last-commit/Rahat0764/BDAdmissio?style=flat-square&color=f2994a" alt="Last Commit">
  <img src="https://img.shields.io/github/license/Rahat0764/BDAdmissio?style=flat-square&color=64748b" alt="License">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Android">
</p>

---

## ✨ Features

- ⏱️ **Live countdown** — days, hours, minutes, and seconds to every unit's exam, updated every second
- 🏫 **Multi-university** — Dhaka University (DU), Jagannath University (JNU), Rajshahi University (RU), Chittagong University (CU), MIST, and easy to extend with more
- 🔗 **Shareable deep links** — `/DU#A` opens straight into a specific university and unit, no clicking required
- 💾 **Remembers your last pick** — visiting the bare domain reopens whatever you selected last, per university
- 🌗 **Dark / light mode** — each university gets its own themed gradient in both modes, based on its crest colors
- 📝 **Admission info at a glance** — application window, class start date, and exam-format notes shown right on the card
- 📱 **Native Android app** — a fullscreen WebView wrapper (edge-to-edge, punch-hole camera aware) with a home-screen **widget** that mirrors the app's card, including logo, theme, and countdown
- 🔄 **Zero-maintenance widget** — the native app is entirely data-driven from the website; add a new university on the site and it shows up in the app *and* the widget with no code changes
- 📥 **Install prompt** — a themed "Install App" pill appears on the website (hidden once you're already using the app), pointed at the latest APK via a Vercel environment variable

## 🖥️ Tech Stack

| Layer | Stack |
|---|---|
| Website | Vanilla HTML / CSS / JavaScript — no build step, no framework |
| Hosting | [Vercel](https://vercel.com) (static + serverless function for the APK link) |
| Android App | Native Java, WebView-based, built with [AIDE](https://www.android-ide.com/) |
| Widget | `AppWidgetProvider` + `RemoteViews`, rendered from the same live site data |

## 📂 Project Structure

```
BDAdmissio/
├── index.html              # the entire website (single file)
├── vercel.json              # routing rules (SPA rewrite + static asset passthrough)
├── api/
│   └── apk-url.js           # serverless function exposing the APK_URL env var
├── assets/
│   └── logo/                # university crest PNGs (du.png, jnu.png, ru.png, ...)
└── android-app/              # native Android wrapper + widget (AIDE project)
    ├── MainActivity.java
    ├── CountdownWidgetProvider.java
    └── ...
```

## 🚀 Running Locally

This is a static site with one serverless function — no build step needed.

```bash
git clone https://github.com/Rahat0764/BDAdmissio.git
cd BDAdmissio
npx vercel dev
```

Or just open `index.html` directly in a browser for the frontend alone (the `/api/apk-url` endpoint won't resolve without `vercel dev` or a live deployment).

## 🔧 Configuration

| Environment Variable | Where | Purpose |
|---|---|---|
| `APK_URL` | Vercel → Project → Settings → Environment Variables | Link the "Install App" pill points to |

## 🏫 Adding a University

Every university lives as one object inside the `UNIVERSITIES` map in `index.html` — name, crest path, theme colors, admission dates, and a list of units. Add a new entry there (and drop its logo PNG into `assets/logo/`) and it's live everywhere: the website, the native app, and the widget — no other changes required.

## 📱 Android App & Widget

The Android app is a lightweight fullscreen WebView wrapper around the live website. It exposes a JavaScript bridge (`window.Android`) that the site uses to push the currently-selected university/unit — name, logo, theme colors, exam date, and notes — down to a native home-screen widget. Since the widget only ever renders whatever the website sends it, it stays in sync automatically as the site's data changes.

> The widget can't tick every second (Android doesn't allow that for home-screen widgets), so it shows the countdown as of the last refresh, with a manual refresh button to recompute it.

## 🤝 Contributing

Issues and pull requests are welcome — whether it's a new university, a bug fix, or a UI tweak.

## 📄 License

This project is open source. See the [LICENSE](LICENSE) file for details.

## 👤 Developer

**Rahat**

<p>
  <a href="https://linkedin.com/in/RahatAhmedX"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://bd-admission.vercel.app/"><img src="https://img.shields.io/badge/Website-3b82f6?style=flat-square&logo=vercel&logoColor=white" alt="Website"></a>
</p>

---

<p align="center"><sub>Built to help Bangladeshi students never miss an admission test date.</sub></p>
