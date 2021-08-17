const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
const database = require('quick.db');
exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permissions to use that.")
  const number = args[0]

 const numberlol = database.fetch(number)
 const username = numberlol.username
 let isactive = numberlol.isactive
 const reason = numberlol.reason
 const by = numberlol.by
 const until = numberlol.until
 if(isactive === "yes") isactive = "Yes, it is."
  if(isactive === "no") isactive = "No, it isn't."
 const discordembedembedembed = new Discord.MessageEmbed()
 .setTitle(`Mute #${number}`)
.addField("Username:",`${username}`,true)
 .addField("Reason:",`${reason}`,true)
 .addField("By:",`${by}`,true)
 .addField("Until",`${until}`,true)
 .addField("Is it active?",`${isactive}`,true)
 .setColor("YELLOW")
 .setTimestamp()
 message.channel.send(discordembedembedembed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["check"],
  PermLevel: 0
};

 

exports.help = {
  name: "mutecheck",
  description: "",
  usage: ""
};