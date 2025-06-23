const fs = require("fs");

module.exports.config = {
  name: "Fahim",
  version: "2.0.0",
  permission: 0,
  credits: "Fahim",
  description: "Auto reply when someone types Fahim",
  prefix: false,
  category: "user",
  usages: "",
  cooldowns: 5,
};

const messageBody = `-❒ 🤖 | 𝐌𝐄𝐒𝐒𝐄𝐆𝐄:
╰┈➤ আসসালামুয়ালাইকুম আমার বস 𝐅𝐀𝐇𝐈𝐌 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘 এখন একটু ব্যাস্ত আছে। আপনার যদি কোনো প্রয়োজন থাকে তাহলে আমাকে বলতে পারেন। বেশি দরকার হলে সরাসরি বস এর ইনবক্সে চলে যান।🌚

━━━━━━━━━━━━━━━━━━━
✿◕ 𝐁𝐎𝐓-𝐎𝐖𝐍𝐄𝐑: 𝐅𝐀𝐇𝐈𝐌 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘 ◕✿🌚
━━━━━━━━━━━━━━━━━━━
𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 :
[ ▶️]➜ 𝗜𝗗: 100091365612246`;

module.exports.handleEvent = function ({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const triggerWords = ["Fahim", "ফাহিম", "FAHIM"];
  const lowerBody = body.toLowerCase();

  for (let word of triggerWords) {
    if (lowerBody.startsWith(word.toLowerCase())) {
      api.sendMessage({ body: messageBody }, threadID, messageID);
      break;
    }
  }
};

module.exports.run = function () {
  // Empty because this command runs via handleEvent only
};
