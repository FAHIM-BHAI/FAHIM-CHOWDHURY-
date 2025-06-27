const axios = require('axios');

module.exports.config = {
  name: "4k",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bondo❤️",
  description: "Generate a 4K AI image using Lexica",
  usePrefix: false,
  commandCategory: "ai",
  usages: "[prompt]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("🖼️ দয়া করে একটি ছবি বানানোর জন্য প্রম্পট দিন।\nউদাহরণ: image4k cyberpunk city", event.threadID);

  try {
    api.sendMessage("⏳ ছবিটি বানানো হচ্ছে, একটু অপেক্ষা করো...", event.threadID, event.messageID);

    const res = await axios.get(`https://lexica.art/api/v1/search?q=${encodeURIComponent(prompt)}`);
    const result = res.data.images[0]?.srcLarge || res.data.images[0]?.src;

    if (!result) return api.sendMessage("❌ ছবি তৈরি করা যায়নি, আবার চেষ্টা করো।", event.threadID);

    const img = (await axios.get(result, { responseType: "arraybuffer" })).data;
    return api.sendMessage({
      body: `✅ তোমার 4K ছবি তৈরি:\n📌 Prompt: ${prompt}`,
      attachment: Buffer.from(img)
    }, event.threadID);
    
  } catch (e) {
    console.error(e);
    return api.sendMessage("🚫 কিছু একটা ভুল হয়েছে, পরে আবার চেষ্টা করো।", event.threadID);
  }
};
