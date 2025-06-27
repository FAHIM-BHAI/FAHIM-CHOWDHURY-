const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "enhance4k",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bondo",
  description: "Upscale an image to HD/4K quality",
  commandCategory: "image",
  usages: "reply to an image",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  if (!event.messageReply || !event.messageReply.attachments[0]) {
    return api.sendMessage("📸 দয়া করে একটি ছবির রিপ্লাই দাও যেটা 4K করতে চাও।", event.threadID, event.messageID);
  }

  const url = event.messageReply.attachments[0].url;

  try {
    api.sendMessage("⏳ ছবিটি 4K তে প্রসেস হচ্ছে, একটু অপেক্ষা করো...", event.threadID, event.messageID);

    const enhanced = await axios.get(`https://api.codemzy.dev/upscale?url=${encodeURIComponent(url)}&scale=2`, {
      responseType: "arraybuffer"
    });

    const filePath = path.join(__dirname, "cache", `4k_${event.senderID}.jpg`);
    fs.writeFileSync(filePath, enhanced.data);

    return api.sendMessage({
      body: "✅ এটা তোমার 4K আপস্কেল করা ছবি!",
      attachment: fs.createReadStream(filePath)
    }, event.threadID, () => fs.unlinkSync(filePath));

  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ ছবি প্রসেস করতে ব্যর্থ হলাম। আবার চেষ্টা করো।", event.threadID, event.messageID);
  }
};
