module.exports.config = {
  name: "notice",
  version: "1.0.0",
  hasPermssion: 1, // শুধু বট এডমিন ব্যবহার করতে পারবে
  credits: "Bondo",
  description: "Broadcast a message to all groups",
  commandCategory: "system",
  usages: "[message]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const adminUIDs = ["100091365612246"]; // এখানে তোমার UID বসাও

  if (!adminUIDs.includes(event.senderID)) {
    return api.sendMessage("❌ এই কমান্ডটি শুধুমাত্র বট অ্যাডমিন ব্যবহার করতে পারবে!", event.threadID, event.messageID);
  }

  const msg = args.join(" ");
  if (!msg) {
    return api.sendMessage("⚠️ দয়া করে একটি মেসেজ লিখো!\nব্যবহার: notice [তোমার নোটিশ]", event.threadID, event.messageID);
  }

  const threads = await api.getThreadList(100, null, ["INBOX"]);
  const groupThreads = threads.filter(thread => thread.isGroup);

  let success = 0;
  let fail = 0;

  for (const thread of groupThreads) {
    try {
      await api.sendMessage(`📢 [NOTICE FROM ADMIN]\n\n${msg}`, thread.threadID);
      success++;
    } catch (err) {
      fail++;
    }
  }

  return api.sendMessage(`✅ Notice পাঠানো হয়েছে ${success}টি গ্রুপে\n❌ ব্যর্থ হয়েছে ${fail}টি`, event.threadID);
};
