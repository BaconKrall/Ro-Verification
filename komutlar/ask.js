const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');
exports.run = async (client, message, args) => {

  if(message.mentions.users.first()) message.author = message.mentions.users.first();
const E = args.splice(0).join(' ')
if(!E) return message.channel.send('Type a question.')
  const Lol = db.fetch(`asknumber`) || 0
  
  message.member.send(`Your question was asked as #${Lol}`)
  const replyembed = new Discord.MessageEmbed()
  .setTitle('Sucess!')
  .setColor('GREEN')
  .addField('Your question is asked. Number:',`#${Lol}`)
  .setFooter('To ask questions, use !ask and wait.')
  message.channel.send(replyembed)
  const embed = new Discord.MessageEmbed()
  .setTitle("Question")
  .setFooter('To ask questions, use !ask.')
  .addField(`Asked By: ${message.author.tag}`,`${E}`)
.setDescription(`Number: #${Lol}`)
  .setColor('GOLD');
  
  db.set(`${Lol}.ask`, E)
  db.set(`${Lol}.askedby`, `${message.author.id}`)
  db.set(`${Lol}.isanswered`, false)
db.add(`asknumber`, 1)
  
  return client.channels.cache.get('802899940888018944').send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ask'],
  PermLevel: 0
};

 

exports.help = {
  name: "a",
  description: "",
  usage: ""
};