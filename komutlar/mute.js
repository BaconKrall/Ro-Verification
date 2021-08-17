const Discord = require('discord.js');
const database = require('quick.db');
const ms = require('ms');
const moment = require('moment');
moment.locale('tr');

exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You have no enough permission!")
if(!args[0]) return message.channel.send('You must ping anyone!');
if(!message.mentions.members.first()) return message.channel.send("I can't find the user you pinged!");
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send("I can't find the person you pinged.");

let argument_one = ['s', 'm', 'h', 'd'];
if(!args[1]) return message.channel.send(`You must enter a time.\nExample: !mute ${message.mentions.members.first()} 5 hour reason`);
if(!args[2]) return message.channel.send(`You must enter a time.\n${argument_one.map(a => `**${a}**`).join('/')}`)
if(!argument_one.includes(args[2])) return message.channel.send(`You must enter a valid time 
.\n${argument_one.map(a => `**${a}**`).join('/')}`)

let reason = 'No reason was entered.';
if(args[3]) reason = args.slice(3).join(' ');
let end = Date.now()+ms(args[1]+' '+args[2].replace('min', 'minutes').replace('hour', 'hours').replace('sec', 'seconds').replace('day', 'day'));
  const number = database.fetch("number") || 0
  database.push(`logs11.${member.user.id}`, `\n\nMute\nBy: ${message.member.user.id}\nReason: ${reason}`)
database.set(`${number}`, {
  
  by: message.member.user.tag,
  until: moment(end).format('DD:MM:YYYY - HH:mm:ss'),
  username: member.user.tag,
  reason: reason,
  isactive: "yes"
});
database.set(member.user.id, { 
  e: moment(end).format('DD.MM.YYYY - HH:mm:ss'),
end: end,
start: Date.now(),
  number: number,
moderatorUsername: message.author.username,
moderatorID: message.author.id,
moderatorAvatarURL: message.author.displayAvatarURL({ dynamic: true }),
reason: reason,
  isactive: "no"
});

let logChannelID = '847046050749087785'; // sizin log kanalızın idsi
let logChannel = await message.guild.channels.cache.get(logChannelID);


member.roles.add('603622642737741828');// muteli rolünün idsi
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setTitle('Someone got muted!')
.setColor('RED')
.setDescription(`**• By**: ${message.author}
**• Person**: <@!${member.user.id}>
**• Reason**: ${reason}
**• Number**: ${number}
**• Until:**: ${moment(end).format('DD.MM.YYYY - HH:mm:ss')}`);
database.add("number",1)
message.channel.send(`Success, ***${member.user.tag}*** has been muted. #${number}`);
logChannel.send(embed);
setTimeout(() => {
  let E = database.fetch(member.user.id)
  let lol = E.number
  database.set(`${lol}`, {
      by: message.member.user.tag,
  until: moment(end).format('DD:MM:YYYY - HH:mm:ss'),
  username: member.user.tag,
  reason: reason,
    isactive: "no"
  })
return member.roles.remove('603622642737741828').then(() => database.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Someone got unmuted.').setDescription(`**• Was By**: ${message.author}
**• Person**: <@!${member.user.id}>
**• Reason**: ${reason}`)));
}, ms(args[1]+' '+args[2].replace('min', 'minutes').replace('hour', 'hours').replace('sec', 'seconds').replace('day', 'day')));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["m"],
  PermLevel: 0
};

 

exports.help = {
  name: "mute",
  description: "",
  usage: ""
};