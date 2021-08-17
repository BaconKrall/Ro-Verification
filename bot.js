const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
require('discord-buttons')(client); // bunu ekleyin eklemezseniz çalışmaz
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags')
const tooken = process.env.token
const interactions = require('discord-slash-commands-client');
//
client.interactions = new interactions.Client(tooken,"848521843018432573");

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} commands will be loaded.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//

    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[COMMAND] | ${props.help.name} has added.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//------------------------------------------------------------------------------------------------------------\\



//------------------------------------------------------------------------------------------------------------\\


//------------------------------------------------------------------------------------------------------------\\




//--------------------------------------------------------------------------------------\\



//--------------------------------------------------------------------------------------\\



//--------------------------------------------------------------------------------------\\




//--------------------------------------------------------------------------------------\\




//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\

client.on('messageDelete', message => {
const embed = new Discord.MessageEmbed()
.setTitle("Message has deleted!")
.addField("Deleted by:",`${message.member}`)
.addField(`Message: ${message}`,`By: ${message.author.username}`)
.setDescription(`Channel: ${message.channel}`)
.setTimestamp()
message.guild.channels.cache.get("731136253847928963").send(embed)
})

client.on("message", async msg => {

        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "http", ".gl", ".org", ".com.tr", ".biz", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            msg.delete()
           if(msg.channel.id !== "676107507676217395") {
            const limitt = db.get(`limitt12332333.${msg.author.id}`) || 0
    await db.add(`limitt12332333.${msg.author.id}`,1)
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
              const nullll = null
             
                   
if(limitt > 1) { 
      msg.member.roles.add("603622642737741828")
              msg.channel.send(`${msg.member}, you got maximum warnings so I had to mute you!`)

          

} else {

                  return msg.reply(`I can't let you advertise here! If you continue I will have to mute you. ${limitt} / 2`)


     
           
                                 
 
            }}      }        
          } catch(err) {
            console.log(err);
          }
        }
    });


client.on('ready', () => {
client.guilds.cache.forEach(guild => {
guild.members.cache.forEach(async member => {
const fetch = await db.fetch(member.user.id);


if(!fetch) return;
if((Date.now() <= fetch.end) || fetch) {
  const number = fetch.number
let kalan = fetch.end - Date.now();
let logChannelID = '847046050749087785'; // sizin log kanalızın idsi
let logChannel = await guild.channels.cache.get(logChannelID);
setTimeout(() => {
const embed = new Discord.MessageEmbed()
.setAuthor(fetch.moderatorUsername, fetch.moderatorAvatarURL);
db.set(`${number}`, {
  isactive: "no"
});
return member.roles.remove('603622642737741828').then(() => db.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Got unmuted.').setDescription(`**• Was By**: <@!${fetch.moderatorID}>
**• Person**: <@!${member.user.id}>
**• Reason**: ${fetch.reason}`)));
}, kalan);
};
});
});
});


client.on('clickButton', async (button) =>  {
  const fetch = await db.fetch(button.clicker.member.user.id);
  const by = fetch.moderatorUsername || 0
  const reason = fetch.reason || 0
  const number = fetch.number
  const until = fetch.e || 0
  if (button.id === "muteeee") {
    const embed = new Discord.MessageEmbed()
    .setTitle("Mute")
    
    .addField("By:",`${by}`)
    
    .addField("Until",`${until}`)
    
    .addField("Reason:",`${reason}`)
    
    .addField("Number:",`#${number}`)
    
    .setColor("YELLOW")
    button.reply.send(embed,true)
  }
})
