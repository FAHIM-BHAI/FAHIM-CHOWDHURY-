module.exports.config = {
  name: "notice",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Bondo",
  description: "Send global notice to all groups",
  commandCategory: "system",
  usages: "[your message]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const permission = ["100091365612246"]; // তোমার UID বসাও এখানে

  if (!permission.includes(event.senderID)) {
    return api.sendMessage("❌ তুমি এই কমান্ড চালানোর অনুমতি পাওনি!", event.threadID);
  }

  const message = args.join(" ");
  if (!message) return api.sendMessage("⚠️ দয়া করে একটি নোটিশ লিখো!\nব্যবহার: notice [তোমার মেসেজ]", event.threadID);

  const threads = await api.getThreadList(100, null, ["INBOX"]);
  const groupThreads = threads.filter(thread => thread.isGroup);

  let success = 0;
  let fail = 0;

  for (const thread of groupThreads) {
    try {
      await api.sendMessage(`📢 Notice from Admin:\n\n${message}`, thread.threadID);
      success++;
    } catch (error) {
      fail++;
    }
  }

  return api.sendMessage(`✅ সফলভাবে পাঠানো হয়েছে ${success}টি গ্রুপে\n❌ ব্যর্থ হয়েছে ${fail}টি গ্রুপে`, event.threadID);
};
