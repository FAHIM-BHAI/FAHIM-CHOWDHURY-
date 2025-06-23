module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "FAHIM",
  description: "OpenAI GPT দিয়ে AI চ্যাট কমান্ড",
  commandCategory: "AI",
  usages: "[মেসেজ]",
  cooldowns: 5,
};

const axios = require("axios");

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");
  if (!input) return api.sendMessage("দয়া করে তোমার প্রশ্ন লিখো।", event.threadID, event.messageID);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer তোমার_OPENAI_API_KEY`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    return api.sendMessage(reply, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("দুঃখিত, AI থেকে উত্তর আনতে সমস্যা হয়েছে।", event.threadID, event.messageID);
  }
};
