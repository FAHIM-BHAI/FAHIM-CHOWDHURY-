const fs = require("fs");

module.exports.config = {
  name: "notice",
  version: "1.0.0",
  hasPermssion: 1, // শুধুমাত্র অ্যাডমিন
  credits: "Fahim",
  description: "Send a notice to all groups",
  commandCategory: "admin",
  usages: "[message]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["100091365612246"]; // এখানে তোমার UID বসাও
  if (!permission.includes(event.senderID)) {
    return api.sendMessage("❌ এই কমান্ডটি শুধু বট অ্যাডমিন ফাহিম বস চালাতে পারবে!", event.threadID, event.messageID);
  }

  const msg = args.join(" ");
  if (!msg) return api.sendMessage("⚠️ দয়া করে একটি মেসেজ লিখো!\n\nব্যবহার:\n/notice তোমার_নোটিস", event.threadID, event.messageID);

  const allThread = await api.getThreadList(100, null, ["INBOX"]);
  const groupThreadIDs = allThread.filter(thread => thread.isGroup && thread.threadID != event.threadID).map(t => t.threadID);

  let sendSuccess = 0;
  let sendFail = 0;

  for (const threadID of groupThreadIDs) {
    try {
      await api.sendMessage(`📢 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 𝗡𝗼𝘁𝗶𝗰𝗲:\n\n${msg}`, threadID);
      sendSuccess++;
    } catch (e) {
      sendFail++;
    }
  }

  return api.sendMessage(`✅ Notice sent to ${sendSuccess} groups.\n❌ Failed to send in ${sendFail} groups.`, event.threadID, event.messageID);
};
