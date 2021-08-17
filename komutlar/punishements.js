const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const ms = require('ms');
const moment = require('moment');
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have enough permissions to use that command.")
  let kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!kisi) return message.channel.send("You must enter a person.")
  let lolthingy = data.fetch(`logs11.${kisi.user.id}`)
  if(lolthingy === null) lolthingy = "No logs have found."
  if(lolthingy === undefined) lolthingy = "No logs have found."
  const discordembed = new Discord.MessageEmbed()
  .setTitle(`${kisi.user.tag}'s logs`)
 .addField("Logs",`${lolthingy}`)
  .setColor('RANDOM')
  message.channel.send(discordembed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["logs"],
  permLevel: 0,
  name: "unmute"
}

exports.help = {
  name: "punishments"
};

