<div align="center">

# 🎓 BD Admission Countdown

*A comprehensive admission countdown tracker for university aspirants in Bangladesh. Available on the Web and as a Native Android App with a Home Screen Widget.*

[![Website](https://img.shields.io/badge/Website-Live_Link-success?style=for-the-badge&logo=vercel)](https://bd-admission.vercel.app/)
[![Downloads](https://img.shields.io/github/downloads/Rahat0764/BDAdmission/total?style=for-the-badge&logo=android&color=blue)](https://github.com/Rahat0764/BDAdmission/releases)
[![Latest Release](https://img.shields.io/github/v/release/Rahat0764/BDAdmission?style=for-the-badge&color=orange)](https://github.com/Rahat0764/BDAdmission/releases)
[![License](https://img.shields.io/github/license/Rahat0764/BDAdmission?style=for-the-badge)](LICENSE)
[![Developer](https://img.shields.io/badge/Developer-Rahat_Ahmed-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/RahatAhmedX)

</div>

## 🚀 Overview

**BD Admission** is a dual-platform application (Web + Android) designed to help students track upcoming university admission exams in Bangladesh. It features real-time countdowns, unit-specific details, and university-themed dynamic UI colors. 

The Android app acts as a wrapper for the web view but seamlessly integrates powerful native features like an interactive **Home Screen Widget** that syncs dynamically with the user's selected university and unit.

## ✨ Features

* ⏱️ **Real-Time Countdown:** Precise tracking of months, days, hours, minutes, and seconds until the exam day.
* 🏛️ **Multiple Universities:** Includes Dhaka University (DU), Jagannath University (JNU), Rajshahi University (RU), Chittagong University (CU), and MIST.
* 🎨 **Dynamic Themes:** The UI automatically shifts its color palette based on the selected university's crest.
* 🌗 **Dark/Light Mode:** Full system support for both dark and light themes.
* 📱 **Native Android Widget:** A beautifully designed home screen widget that displays the countdown and university info without needing to open the app.
* ⚡ **Vercel API Integration:** Automatically fetches the latest APK release URL for easy installation directly from the web interface.

## 🛠️ Tech Stack

* **Frontend (Web):** HTML5, CSS3, Vanilla JavaScript, CSS Variables.
* **Backend / Hosting:** Vercel, Node.js (Serverless API for APK URL fetching).
* **Android App:** Java, Android WebView, AppWidgetProvider (for the Native Widget).

## 📥 Installation & Usage

### Android App
1. Go to the [Releases page](https://github.com/Rahat0764/BDAdmission/releases).
2. Download the latest `.apk` file.
3. Install it on your Android device (ensure "Install from unknown sources" is enabled in your settings).
4. Add the widget to your home screen for quick access.

### Web Version
Simply visit the web app from any browser: **[https://bd-admission.vercel.app/](https://bd-admission.vercel.app/)**

## 💻 Development Setup

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Rahat0764/BDAdmission.git](https://github.com/Rahat0764/BDAdmission.git)
   ```
2. **Web Frontend:**
   Open `index.html` in your browser. *(Note: The Vercel API endpoint `/api/apk-url.js` will not fetch the download link locally without the Vercel CLI).*
3. **Android App:**
   * Open the `app/` folder in **Android Studio**.
   * Sync Gradle files.
   * Run the app on an emulator or a physical device.

## 👨‍💻 Developer

Developed and maintained by **Rahat Ahmed**.

[![LinkedIn](https://img.shields.io/badge/Connect-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/RahatAhmedX)
[![GitHub](https://img.shields.io/badge/Follow-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Rahat0764)

---
*If you find this project helpful, please consider giving it a ⭐!*