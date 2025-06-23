const fs = require("fs");
module.exports.config = {
  name: "Fahim",
  version: "2.0.0",
  permission: 0,
  credits: "Fahim",
  description: "",
  prefix: false,
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Fahim")==0 || (event.body.indexOf("ফাহিম")==0 || (event.body.indexOf("FAHIM")==0 || (event.body.indexOf("")==0)))) {
		var msg = {
				body: "-❒ 🤖 | 𝐌𝐄𝐒𝐒𝐄𝐆𝐄:\n╰┈➤ আসসালামুয়ালাইকুম আমার বস 𝐅𝐀𝐇𝐈𝐌 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘 এখন একটু ব্যাস্ত আছে আপনার যদি কোনো প্রয়োজন তাকে তাহলে আমাকে বলতে পারেন বেশি প্রয়োজন হলে বস এর ইনবক্স চলে জাও-!!🌚\n\n━━━━━━━━━━━━━━━━━━━\n✿◕𝐁𝐎𝐓-𝐎𝐖𝐍𝐄𝐑:𝐅𝐀𝐇𝐈𝐌 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘◕✿🌚\n━━━━━━━━━━━━━━━━━━━\n𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 :\n[ ▶️]➜ 𝗜𝗗: 100091365612246"
    }
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }
