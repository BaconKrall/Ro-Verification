const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');

exports.run = async (client, message, args) => {

  if(message.mentions.users.first()) message.author = message.mentions.users.first();

  const embed = new Discord.MessageEmbed()
  .setTitle("Mute")
  .addField('To see why you are muted, click the button.','Ro-Bots 2')
  .setColor('GOLD');

  const button = new MessageButton()
  .setLabel('Why am I muted?')
  .setID('muteeee')
  .setStyle('red')

  return message.channel.send({ embed: embed, component: button });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["panel"],
  PermLevel: 0
};

 

exports.help = {
  name: "panel",
  description: "",
  usage: ""
};