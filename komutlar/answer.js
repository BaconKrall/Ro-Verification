
const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');
exports.run = async (client, message, args) => {

if (message.author.id !== '735810559961858140') return message.channel.send('Only BaconKral#1111 use it for now.')

  const questionnumber = args[0]
  if(!questionnumber) return message.channel.send('You must enter a number to answer.')
  const answer = args.splice(1).join(' ')
  const questionis = db.fetch(`${questionnumber}.ask`)
  const askedby = db.fetch(`${questionnumber}.askedby`)
  message.channel.send(`You answered question #${questionnumber}`)
  const embed = new Discord.MessageEmbed()
  
  .setTitle(`Hi, your question #${questionnumber} is answered.`)
  .addField(`${questionis}`,`${answer}`)
  .setColor('GREEN')
  .setFooter('You can always ask questions by !ask.')
  client.users.cache.get(askedby).send(embed)
  };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['answerquestion'],
  PermLevel: 0
};

 

exports.help = {
  name: "answer",
  description: "",
  usage: ""
};