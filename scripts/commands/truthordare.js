module.exports.config = {
  name: "truthordare",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bondhu",
  description: "Play Truth or Dare 🎭",
  commandCategory: "fun",
  usages: "[truth/dare] [@mention]",
  cooldowns: 3,
};

module.exports.run = async function({ api, event, args }) {
  const mention = Object.keys(event.mentions)[0];
  const targetName = mention ? event.mentions[mention].replace("@", "") : "তোমাকে";

  const mode = args[0]?.toLowerCase();
  const validModes = ["truth", "t", "dare", "d"];

  if (!validModes.includes(mode)) {
    return api.sendMessage("🔎 ব্যবহার: truthordare [truth/dare] [@mention]", event.threadID);
  }

  const truths = [
    "তুমি কি কাউকে না বলে পছন্দ করো এখনো? 😏",
    "তোমার জীবনের সবচেয়ে বড় গোপন কথা কী? 🤐",
    "তুমি কি প্রেমে ধোঁকা দিয়েছো কাউকে? 💔",
    "তোমার crush এখন কে? 😳",
    "তুমি এখনই কাকে call করতে চাও, আর কি বলবে? 📞"
  ];

  const dares = [
    "গ্রুপে সবার সামনে 'আমি প্রেমে পড়েছি তোমার' বলো 😜",
    "নিজের প্রোফাইল পিক ৫ মিনিটের জন্য meme দাও 😆",
    "একটা romantic গান গেয়ে voice করে পাঠাও 🎤",
    "এই গ্রুপে যাকে সবচেয়ে সুন্দর লাগে তাকে tag করো 😏",
    "নিজেকে describe করো 3 emoji দিয়ে 🧠🔥💔"
  ];

  const selected =
    mode === "truth" || mode === "t"
      ? truths[Math.floor(Math.random() * truths.length)]
      : dares[Math.floor(Math.random() * dares.length)];

  const message = `🎲 ${mode === "truth" || mode === "t" ? "Truth" : "Dare"} for ${targetName}:\n\n${selected}`;
  const mentions = mention ? [{ tag: targetName, id: mention }] : [];

  return api.sendMessage({ body: message, mentions }, event.threadID, event.messageID);
};
