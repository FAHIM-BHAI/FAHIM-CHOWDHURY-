module.exports.config = {
  name: "adminnoti",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Fahim",
  description: "Broadcast message to all groups",
  commandCategory: "system",
  usages: "[text]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const permission = ["100091365612246"]; // তোমার UID এখানে বসাও
  if (!permission.includes(event.senderID)) {
    return api.sendMessage("❌ এই কমান্ডটি শুধুমাত্র বস ফাহিম অ্যাডমিন ব্যবহার করতে পারবে!", event.threadID);
  }

  const msg = args.join(" ");
  if (!msg) return api.sendMessage("📢 একটি মেসেজ লিখো যা সকল গ্রুপে পাঠানো হবে!\n\nব্যবহার:\nadminnoti [তোমার মেসেজ]", event.threadID);

  const threads = await api.getThreadList(100, null, ["INBOX"]);
  const groupThreads = threads.filter(t => t.isGroup);

  let success = 0, fail = 0;
  for (const thread of groupThreads) {
    try {
      await api.sendMessage(`📢 Admin Notice:\n\n${msg}`, thread.threadID);
      success++;
    } catch (e) {
      fail++;
    }
  }

  return api.sendMessage(`✅ Success: ${success} গ্রুপে পাঠানো হয়েছে\n❌ Failed: ${fail}`, event.threadID);
};
