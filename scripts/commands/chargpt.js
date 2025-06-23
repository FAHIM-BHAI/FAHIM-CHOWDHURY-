module.exports.config = {
  name: "chargpt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bondo",
  description: "ChatGPT দিয়ে মেসেজের উত্তর দেয়",
  commandCategory: "AI",
  usages: "[প্রশ্ন]",
  cooldowns: 5,
};

const axios = require("axios");

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("দয়া করে প্রশ্নটি লিখুন।", event.threadID, event.messageID);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY_HERE`,
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    return api.sendMessage(answer, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("দুঃখিত, ChatGPT থেকে উত্তর আনতে সমস্যা হয়েছে।", event.threadID, event.messageID);
  }
};
