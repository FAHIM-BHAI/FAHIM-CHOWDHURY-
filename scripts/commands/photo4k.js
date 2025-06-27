const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "photo4k",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bondo",
  description: "Upscale image to 4K quality",
  commandCategory: "image",
  usages: "reply to an image",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const reply = event.messageReply;

  if (!reply || !reply.attachments || reply.attachments.length === 0 || reply.attachments[0].type !== "photo") {
    return api.sendMessage("📌 দয়া করে একটি ছবির রিপ্লাই দাও।\nউদাহরণ:\nphoto4k", event.threadID, event.messageID);
  }

  const imgUrl = reply.attachments[0].url;
  const downloadingMsg = await api.sendMessage("📥 ছবি ডাউনলোড হচ্ছে...", event.threadID);

  try {
    const inputPath = path.join(__dirname, "cache", `input_${event.senderID}.jpg`);
    const outputPath = path.join(__dirname, "cache", `output_${event.senderID}.jpg`);

    const imgData = await axios.get(imgUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(inputPath, Buffer.from(imgData.data, "utf-8"));

    const enhanceRes = await axios({
      method: "POST",
      url: "https://api.deepai.org/api/torch-srgan",
      headers: {
        "Api-Key": "quickstart-QUdJIGlzIGNvbWluZy4uLi4K" // Public test key from DeepAI
      },
      data: {
        image: fs.createReadStream(inputPath)
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    const upscaledImage = await axios.get(enhanceRes.data.output_url, { responseType: "arraybuffer" });
    fs.writeFileSync(outputPath, Buffer.from(upscaledImage.data, "utf-8"));

    api.sendMessage({
      body: "✅ নিচে তোমার 4K Enhanced ছবি:",
      attachment: fs.createReadStream(outputPath)
    }, event.threadID, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    }, downloadingMsg.messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ ছবি 4K করতে গিয়ে সমস্যা হয়েছে। আবার চেষ্টা করো।", event.threadID, event.messageID);
  }
};
