export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.status(200).json({
    url: process.env.APK_URL || null,
    versionCode: process.env.APK_VERSION_CODE ? parseInt(process.env.APK_VERSION_CODE, 10) : null,
    versionName: process.env.APK_VERSION_NAME || null,
    changelog: process.env.APK_CHANGELOG || ''
  });
}