module.exports.config = {
  name: "bossmsg",
  version: "1.0.0",
  permission: 1, // 1 = Admin only
  credits: "Fahim",
  description: "Admin custom message sender",
  prefix: true,
  category: "admin",
  usages: "[message]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (args.length === 0) {
    return api.sendMessage("⚠️ একটি বার্তা লিখুন বস!", threadID, messageID);
  }

  const message = args.join(" ");
  const finalMsg = `👑 Admin Message by 𝐅𝐀𝐇𝐈𝐌 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘:\n\n${message}`;

  api.sendMessage(finalMsg, threadID, messageID);
};
