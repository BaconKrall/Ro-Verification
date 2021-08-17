const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setTitle("Commands")
.addField("```!help```","Shows you command of the bot.",true)
.addField("```!verify```","Lets you to verify.",true)
.addField("```!profile```","Coming soon.",true)
.addField("```!id```","Coming soon.",true)
.addField("```!mute```","Allows you to mute.",true)
.addField("```!ask```","You can ask a question.")
.setThumbnail(message.author.avatarURL({dynamic:true}))
.setImage("https://share.creavite.co/GY7RU2e9M5vX3PCx.gif")
.setTimestamp()
.setColor("YELLOW")
message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "help",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};

