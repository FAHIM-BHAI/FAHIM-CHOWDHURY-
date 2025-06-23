const fs = require("fs");
const path = __dirname + "/../cache/gf.jpg";

module.exports.config = {
  name: "gf",
  version: "1.0.0",
  permission: 1, // Only admin
  credits: "Fahim",
  description: "Tag someone as GF with love message and picture",
  prefix: true,
  category: "fun",
  usages: "@mention",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, mentions } = event;

  // Check if picture exists
  if (!fs.existsSync(path)) {
    return api.sendMessage("❌ ছবি পাওয়া যায়নি! দয়া করে `cache/gf.jpg` ফাইলে GF-এর ছবি দাও।", threadID, messageID);
  }

  // কেউ mention করছে তো?
  if (!mentions || Object.keys(mentions).length === 0) {
    return api.sendMessage("⚠️ কারো নাম mention করো GF বানানোর আগে! 😼", threadID, messageID);
  }

  // প্রথম mention করা ইউজার ইনফো
  const mentionID = Object.keys(mentions)[0];
  const mentionName = mentions[mentionID];

  const msg = {
    body: `🌸 আমার ভালোবাসা, আমার জীবনের রাণী 💖\n\n👑 GF নাম: ${mentionName}\n🆔 ID: ${mentionID}\n\n❣️ আমার হৃদয়ের রানী, আমার ফাহিমের পৃথিবী!`,
    attachment: fs.createReadStream(path),
    mentions: [{
      tag: mentionName,
      id: mentionID
    }]
  };

  return api.sendMessage(msg, threadID, messageID);
};
