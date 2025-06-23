const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "sis",
  version: "2.0.0",
  permission: 0,
  credits: "Priyansh Rajput + Modified by Fahim",
  description: "Make brother-sister image pair",
  prefix: true,
  category: "image",
  usages: "@mention",
  cooldowns: 5,
};

module.exports.onLoad = async () => {
  const dir = path.join(__dirname, "cache/canvas");
  const imgPath = path.join(dir, "sis.png");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (!fs.existsSync(imgPath)) {
    const res = await axios.get("https://i.imgur.com/n2FGJFe.jpg", { responseType: "arraybuffer" });
    fs.writeFileSync(imgPath, Buffer.from(res.data, "utf-8"));
  }
};

async function circle(imagePath) {
  const image = await jimp.read(imagePath);
  image.circle();
  return await image.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
  const __root = path.join(__dirname, "cache", "canvas");
  const baseImg = await jimp.read(path.join(__root, "sis.png"));

  const pathImg = path.join(__root, `sis_${one}_${two}.png`);
  const avatarOne = path.join(__root, `avt_${one}.png`);
  const avatarTwo = path.join(__root, `avt_${two}.png`);

  const img1 = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarOne, Buffer.from(img1, 'utf-8'));

  const img2 = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarTwo, Buffer.from(img2, 'utf-8'));

  const circleOne = await jimp.read(await circle(avatarOne));
  const circleTwo = await jimp.read(await circle(avatarTwo));

  baseImg.composite(circleOne.resize(191, 191), 93, 111)
         .composite(circleTwo.resize(190, 190), 434, 107);

  await baseImg.writeAsync(pathImg);
  fs.unlinkSync(avatarOne);
  fs.unlinkSync(avatarTwo);

  return pathImg;
}

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, mentions, senderID } = event;
  const mention = Object.keys(mentions);

  if (mention.length === 0)
    return api.sendMessage("⚠️ কারো নাম mention করো ভাই-বোন বানানোর আগে! 😄", threadID, messageID);

  const one = senderID;
  const two = mention[0];

  try {
    const imgPath = await makeImage({ one, two });
    const msg = {
      body: `✧•❁𝐁𝐡𝐚𝐢-𝐁𝐚𝐡𝐚𝐧❁•✧\n\n╔═══❖••° °••❖═══╗\n\n   𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥 𝐏𝐚𝐢𝐫𝐢𝐧𝐠\n\n╚═══❖••° °••❖═══╝\n\n   ✶⊶⊷⊷❍⊶⊷⊷✶\n\n       👑 𝐌𝐢𝐥𝐥 𝐆𝐚𝐲𝐢 ❤\n\n𝐓𝐞𝐫𝐢 𝐒𝐢𝐬𝐭𝐞𝐫 🩷`,
      attachment: fs.createReadStream(imgPath)
    };
    api.sendMessage(msg, threadID, () => fs.unlinkSync(imgPath), messageID);
  } catch (e) {
    console.log(e);
    api.sendMessage("modules/commands/cache/canvas/sis.png", threadID, messageID);
  }
};
