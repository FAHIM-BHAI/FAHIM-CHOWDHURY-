const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "2.0.0",
  credits: "CatalizCS - Fixed by itz Aryan",
  description: "Notify and welcome group members with canvas image"
};

module.exports.onLoad = function () {
  const base = path.join(__dirname, "Alvi");
  const gifPath = path.join(base, "joinGif", "randomgif");
  const bgPath = path.join(base, "backgrounds");
  if (!fs.existsSync(gifPath)) fs.mkdirSync(gifPath, { recursive: true });
  if (!fs.existsSync(bgPath)) fs.mkdirSync(bgPath, { recursive: true });
};

module.exports.run = async function ({ api, event }) {
  const { threadID, logMessageData } = event;

  if (logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`{ ${global.config.PREFIX} } × ${global.config.BOTNAME || "bot"}`, threadID, api.getCurrentUserID());
    return api.sendMessage("╭──────•◈•───────╮\n            𝐀𝐋𝐁𝐔𝐌        \n   বাচ্চারা চলে এসেছি আমি \nপিচ্চি ফাহিম তোমাদের মাঝে_🤭 \n╰──────•◈•───────╯", threadID, () =>
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

🐰

Use ${global.config.PREFIX}help to see commands.

example :
${global.config.PREFIX}mark (text)
${global.config.PREFIX}lexi (text)
${global.config.PREFIX}trump (text)
${global.config.PREFIX}info`,
        attachment: fs.createReadStream(__dirname + "/Alvi/joinmp4/alvi.mp4")
      }, threadID)
    );
  } else {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const participantIDs = threadInfo.participantIDs;
      const threadName = threadInfo.threadName || "this group";

      for (const participant of logMessageData.addedParticipants) {
        const userID = participant.userFbId;
        const userInfo = await api.getUserInfo(userID);
        const userName = userInfo[userID].name;
        const memberNumber = participantIDs.length;

        const welcomeMsg = `╔════•|      ✿      |•════╗
 💐আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ💐
╚════•|      ✿      |•════╝

    ✨🆆🅴🅻🅻 🅲🅾🅼🅴✨

                 ❥𝐍𝐄𝐖~

        ~🇲‌🇪‌🇲‌🇧‌🇪‌🇷‌~

             [ ${userName} ]

༄✺আ্ঁপ্ঁনা্ঁকে্ঁ আ্ঁমা্ঁদে্ঁর্ঁ✺࿐

${threadName}

 🥰🖤🌸—এ্ঁর্ঁ প্ঁক্ষ্ঁ🍀থে্ঁকে্ঁ🍀—🌸🥀

         🥀_ভা্ঁলো্ঁবা্ঁসা্ঁ_অ্ঁভি্ঁরা্ঁম্ঁ_🥀

༄✺আঁপঁনিঁ এঁইঁ গ্রুঁপেঁর ${memberNumber} নঁং মে্ঁম্বা্ঁরঁ ࿐

╭──────•◈•───────╮
   𝐅𝐀𝐇𝐈𝐌 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘      

 ক্ষ্ঁণি্ঁকে্ঁর্ঁ অ্ঁতি্ঁথি্ঁ হ্ঁয়ে্ঁ এ্ঁসে্ঁছো্ঁ তু্ঁমি্ঁ আ্ঁমা্ঁদে্ঁর্ঁ মা্ঁঝে্ঁ 🥰🌺
ভা্ঁলো্ঁবা্ঁসা্ঁ দি্ঁও্ঁ ভা্ঁল্ঁবা্ঁসা্ঁ নি্ঁও্ঁ তা্ঁর্ঁ সা্ঁথে্ঁ আ্ঁমা্ঁদে্ঁর্ঁ ফ্যা্ঁমে্ঁলি্ঁ  গ্রু্ঁপ্ঁ টা্ঁরে্ঁ সা্ঁম্ঁনে্ঁ আ্ঁগা্ঁই্ঁতে্ঁ সা্ঁহা্ঁয্য্ঁ ক্ঁরি্ঁও্ঁ ধ্ঁন্য্ঁবা্ঁদ্ঁ...!!🦋 
╰──────•◈•───────╯

    ╔╦══•    •✠•❀•✠ •   •══╦╗
        ♥ 𝐁𝐎𝐓'𝐬 𝐎𝐖𝐍𝐄𝐑 ♥
                           ☟                     
 ♥𝐅𝐀𝐇𝐈𝐌 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘♥
    ╚╩══•    •✠•❀•✠ •    •══╩╝`;

        const bgDir = path.join(__dirname, "Alvi", "backgrounds");
        const bgFiles = fs.readdirSync(bgDir).filter(file => /\.(jpg|png)$/i.test(file));
        const bgPath = path.join(bgDir, bgFiles[Math.floor(Math.random() * bgFiles.length)]);
        const background = await loadImage(bgPath);

        const canvas = createCanvas(1350, 768);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatarURL = `https://graph.facebook.com/${userID}/picture?width=512&height=512`;
        const avatarBuffer = (await axios.get(avatarURL, { responseType: "arraybuffer" })).data;
        const avatar = await loadImage(Buffer.from(avatarBuffer, 'binary'));

        ctx.save();
        ctx.beginPath();
        ctx.arc(675, 250, 120, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 555, 130, 240, 240);
        ctx.restore();

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "bold 60px Arial";
        ctx.fillText(userName, 675, 440);
        ctx.font = "bold 35px Arial";
        ctx.fillText(`Welcome to ${threadName}`, 675, 510);
        ctx.font = "bold 32px Arial";
        ctx.fillText(`You are the ${memberNumber}th member of this group`, 675, 570);

        const imagePath = path.join(__dirname, "Alvi", "joinGif", `${userID}_welcome.png`);
        fs.writeFileSync(imagePath, canvas.toBuffer());

        await api.sendMessage({ body: welcomeMsg }, threadID, () => {
          api.sendMessage({
            attachment: fs.createReadStream(imagePath)
          }, threadID, () => fs.unlinkSync(imagePath));
        });
      }
    } catch (e) {
      console.log("joinNoti Error:", e);
    }
  }
};
