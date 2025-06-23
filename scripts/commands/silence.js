module.exports.config = {
  name: "silence",
  version: "1.0.0",
  permission: 1,
  credits: "Fahim",
  description: "Silence the group with a warning",
  prefix: true,
  category: "admin",
  usages: "",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event }) {
  const msg = "⚠️ এই গ্রুপে এখন থেকে চুপচাপ থাকা বাধ্যতামূলক।\nকেউ কথা বললে ফাহিম বস personally বকা দিবে 😈";
  return api.sendMessage(msg, event.threadID, event.messageID);
};
