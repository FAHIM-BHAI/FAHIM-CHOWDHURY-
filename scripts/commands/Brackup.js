module.exports.config = {
  name: "breakup",
  version: "1.0.0",
  permission: 0,
  credits: "Fahim edition",
  prefix: false,
  description: "Breakup express",
  category: "without prefix",
  usages: "[tag]",
  cooldowns: 5
};

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("যার সাথে ব্রেকআপ করবা, তাকে @ম্যানশন করতে হবে 💔", event.threadID);
    let name = event.mentions[mention];
    var arraytag = [];
    arraytag.push({ id: mention, tag: name });
    var send = msg => api.sendMessage(msg, event.threadID);

    send("...বলে নিচ্ছি, আমি কারো পক্ষ থেকে না... এটা আমার নিজের কথাই...🥀");

    setTimeout(() => { send({body: "তোমার সাথে কাটানো সময়গুলো ভুলবো না কখনো..." + " " + name, mentions: arraytag})}, 3000);
    setTimeout(() => { send({body: "কিন্তু এখন মনে হয়, আমরা একে অপরের জন্য ছিলাম না..." + " " + name, mentions: arraytag})}, 6000);
    setTimeout(() => { send({body: "আমি আর পারছি না, বারবার ভেঙে পড়ি নিজের ভিতরে 😔" + " " + name, mentions: arraytag})}, 9000);
    setTimeout(() => { send({body: "ভালোবাসি এখনো, কিন্তু নিজের মানসিক শান্তির জন্য দূরে যাচ্ছি 😞" + " " + name, mentions: arraytag})}, 12000);
    setTimeout(() => { send({body: "আমার জায়গা আর তোমার জীবনে নেই — এটা মেনে নিচ্ছি 💔" + " " + name, mentions: arraytag})}, 15000);
    setTimeout(() => { send({body: "তুমি সুখে থাকো — সেটাই চেয়েছি সবসময় 🙂" + " " + name, mentions: arraytag})}, 18000);
    setTimeout(() => { send({body: "আমার জায়গায় কেউ ভালো আসবে, এই প্রার্থনা রইলো 🥀" + " " + name, mentions: arraytag})}, 21000);
    setTimeout(() => { send("⛓️ শেষবারের মত বলছি, বিদায়... আমার প্রিয় মানুষটা 🖤")}, 25000);
    setTimeout(() => { send("•┈┈┈┈••✦ ❤ ✦••┈┈┈┈•\n💔𝐁𝐑𝐄𝐀𝐊𝐔𝐏 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄💔") }, 29000);
};
