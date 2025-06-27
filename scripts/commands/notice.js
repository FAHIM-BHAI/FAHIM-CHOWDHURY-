module.exports.config = {
  name: "notice",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Bondo",
  description: "Send global message to all groups",
  commandCategory: "admin",
  usages: "[your message]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  return api.sendMessage(`✅ notice.js is working!\n\nআপনার মেসেজ ছিল:\n${args.join(" ") || "কিছু লেখো!"}`, event.threadID);
};
