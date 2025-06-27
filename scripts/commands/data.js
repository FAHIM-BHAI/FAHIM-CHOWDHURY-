module.exports.config = {
  name: "data",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bondhu",
  description: "Provides useful data like medicine price, weather, exam info",
  commandCategory: "info",
  usages: "[medicine/weather/exam] [query]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const category = args[0]?.toLowerCase();
  const query = args.slice(1).join(" ").toLowerCase();

  if (!category) {
    return api.sendMessage("🔎 ব্যবহার: data [medicine/weather/exam] [query]", event.threadID);
  }

  // Local data sets
  const medicines = {
    "i-cap 400": "💊 I-Cap 400: দাম প্রায় ১৫ টাকা প্রতি ক্যাপসুল",
    "suprovit m": "💊 Suprovit-M: দাম ৭-৮ টাকা",
    "napa extra": "💊 Napa Extra: দাম ১.৫-২ টাকা",
  };

  const weather = {
    "dhaka": "🌤️ আজ ঢাকা শহরের তাপমাত্রা প্রায় ৩২°C, আংশিক মেঘলা।",
    "chittagong": "🌦️ চট্টগ্রামে আজ বৃষ্টি সম্ভাবনা ৭০%, তাপমাত্রা ৩০°C।"
  };

  const exams = {
    "hsc english": "📚 HSC English 1st Paper: Seen + Grammar + Paragraph 100% আসবে!",
    "hsc math": "📐 HSC Math: Trigonometry, Algebra 100% আসবে!",
    "ssc physics": "⚡ SSC Physics: Chapter 5 ও 7 গুরুত্বপূর্ণ!"
  };

  let response;

  if (category === "medicine") {
    response = medicines[query] || "❌ এই ওষুধের তথ্য ডেটাবেসে নেই!";
  } else if (category === "weather") {
    response = weather[query] || "❌ এই শহরের আবহাওয়া ডেটা নেই!";
  } else if (category === "exam") {
    response = exams[query] || "❌ এই পরীক্ষার তথ্য আপডেট করা হয়নি!";
  } else {
    response = "❓ আপনি 'medicine', 'weather' বা 'exam' - এই তিনটির একটিকে পছন্দ করুন।";
  }

  return api.sendMessage(response, event.threadID, event.messageID);
};
