const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "CatalizCS (Fixed by Bondo)",
  description: "Notify bot or group member with random gif/photo/video",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

module.exports.onLoad = function () {
  const joinGifPath = path.join(__dirname, "Alvi", "joinGif");
  const randomGifPath = path.join(joinGifPath, "randomgif");

  if (!fse.existsSync(joinGifPath)) fse.mkdirSync(joinGifPath, { recursive: true });
  if (!fse.existsSync(randomGifPath)) fse.mkdirSync(randomGifPath, { recursive: true });
};

module.exports.run = async function ({ api, event }) {
  const { threadID } = event;

  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`{ ${global.config.PREFIX} } × ${global.config.BOTNAME || "bot"}`, threadID, api.getCurrentUserID());

    return api.sendMessage(
      "╭──────•◈•───────╮\n            𝐀𝐋𝐁𝐔𝐌        \n   বাচ্চারা চলে এসেছি আমি \nপিচ্চি ফাহিম তোমাদের মাঝে_🤭 \n╰──────•◈•───────╯",
      threadID,
      () =>
        api.sendMessage({
          body: `________আসসালামু আলাইকুম___________
  
🤖ROBOT CONNECTED SUCCESSFULLY🤖
  
চলে আসলাম তোমাদের মাঝে 🥀

◑আপনাকে অনেক ধন্যবাদ আমাকে এড দেওয়ার জন্য,❤️‍🔥

◑কিন্তু আমাকে কন্ট্রোল করার জন্য প্রয়োজন আমার বস ফাহিম কে🤙

◑মেম্বারদের সব কমান্ড আমার পক্ষে পালনকরা সম্ভব না 😔

◑আমার বস ফাহিম কে এড দিতে প্রথমে টাইপ করুন /adduser তারপর একটা স্পেস দিয়ে বস এর 𝒖𝒊'𝒅 100029901980367 দিন ☺️

◑ ফেসবুক লিংক ☞ https://www.facebook.com/profile.php?id=100029901980367

◑ 𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥 𝘼𝙘𝙘𝙤𝙪𝙣𝙩 --> wa.me/+8801315086453 🐰😗

🐰\n\nUse ${global.config.PREFIX}help to see commands.\n\nexample :\n${global.config.PREFIX}mark (text)\n${global.config.PREFIX}lexi (text)\n${global.config.PREFIX}trump (text)\n${global.config.PREFIX}info`,
          attachment: fs.existsSync(__dirname + "/Alvi/joinmp4/alvi.mp4")
            ? fs.createReadStream(__dirname + "/Alvi/joinmp4/alvi.mp4")
            : undefined,
        }, threadID)
    );
  } else {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const { participantIDs, threadName } = threadInfo;
      const mentions = [];
      const nameArray = [];
      const memLength = [];

      event.logMessageData.addedParticipants.forEach((user, index) => {
        nameArray.push(user.fullName);
        mentions.push({ tag: user.fullName, id: user.userFbId });
        memLength.push(participantIDs.length - index);
      });

      memLength.sort((a, b) => a - b);

      let msg = (global.data.threadData.get(parseInt(threadID)) || {}).customJoin ||
`💐আসসালামু আলাইকুম💐

✨Welcome {name}✨

আপনি {threadName} গ্রুপের {soThanhVien} নম্বর সদস্য।

আমাদের পরিবারের এক অংশ হয়ে যাওয়ায় ধন্যবাদ! 🥰`;

      msg = msg
        .replace(/\{name}/g, nameArray.join(", "))
        .replace(/\{soThanhVien}/g, memLength.join(", "))
        .replace(/\{threadName}/g, threadName);

      const gifFolder = path.join(__dirname, "Alvi", "joinGif");
      const gifFile = path.join(gifFolder, `${threadID}.gif`);
      const randomGifFolder = path.join(gifFolder, "randomgif");

      let formPush = { body: msg, mentions };

      if (fs.existsSync(gifFile)) {
        formPush.attachment = fs.createReadStream(gifFile);
      } else {
        const randomFiles = fs.readdirSync(randomGifFolder);
        if (randomFiles.length > 0) {
          const randomFile = randomFiles[Math.floor(Math.random() * randomFiles.length)];
          formPush.attachment = fs.createReadStream(path.join(randomGifFolder, randomFile));
        }
      }

      return api.sendMessage(formPush, threadID);
    } catch (e) {
      console.error("❌ JoinNoti Error:", e);
    }
  }
};
