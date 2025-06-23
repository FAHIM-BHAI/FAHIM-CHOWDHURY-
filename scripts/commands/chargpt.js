module.exports.config = {
  name: "chatgpt_auto",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bondo",
  description: "প্রত্যেক মেসেজে ChatGPT দিয়ে রিপ্লাই দেয়",
  commandCategory: "AI",
  usages: "কোনো কমান্ড নয়",
  cooldowns: 0,
  // এইটা যদি true থাকে তাহলে প্রত্যেক মেসেজে চালাবে
  eventType: ["message"],
};

const axios = require("axios");

module.exports.run = async function({ api, event }) {
  const message = event.body;
  if (!message || event.senderID === api.getCurrentUserID()) return;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
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
